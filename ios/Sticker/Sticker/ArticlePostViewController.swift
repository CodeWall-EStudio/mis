//
//  ArticlePostViewController.swift
//  Sticker
//
//  Created by Joey Chow on 5/22/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit
import SwiftHTTP
import JSONJoy

class ArticlePostViewController: UIViewController, UIAlertViewDelegate,UIImagePickerControllerDelegate,UINavigationControllerDelegate,UIPopoverControllerDelegate {

    
    var picker:UIImagePickerController=UIImagePickerController()
    var popover:UIPopoverController?=nil
    
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    
    var action = true
    
    @IBOutlet weak var articleContentInputHeight: NSLayoutConstraint!
    @IBOutlet weak var articleContentInputTextView: UITextView!
    @IBOutlet weak var articleTitleInputTextField: UITextField!
    @IBOutlet weak var photoOperateScrollView: UIScrollView!
    @IBOutlet weak var photoShow: UIImageView!
    @IBOutlet weak var photoAddButton: UIButton!
    @IBAction func handleArticleContentPan(sender: UIPanGestureRecognizer) {
        articleContentInputTextView.resignFirstResponder()
        photoOperateScrollView.hidden = true
        
        articleContentInputHeight.constant = 40
    }
    @IBOutlet weak var postButtonItem: UIBarButtonItem!
    @IBAction func postArticle(sender: UIBarButtonItem) {
        
        if (action) {
            action = false
            activityIndicator.startAnimating()
            let title = articleTitleInputTextField.text
            let content = articleContentInputTextView.text
            if (photoShow.image != nil) {
                //var imageData: NSData = UIImagePNGRepresentation(svc.showImage.image)
                let imageData: NSData = UIImageJPEGRepresentation(photoShow.image, 0.01)
                var request = HTTPTask()
                request.requestSerializer = HTTPRequestSerializer()
                request.requestSerializer.headers["Cookie"] = "sid=\"\(HTTP.shared.sid)\""
                
                request.POST("http://\(Config.shared.server)/cgi/resource/upload", parameters:  ["aParam": "aValue", "file": HTTPUpload(data: imageData, fileName: "image", mimeType: "image/jpeg")], success: {(response: HTTPResponse) in
                    
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        var nsString: NSString = response.text!
                        println(nsString)
                        nsString = nsString.stringByReplacingOccurrencesOfString("<script>top.uploadComp(", withString: "")
                        nsString = nsString.stringByReplacingOccurrencesOfString(")</script>", withString: "")
                        let data = nsString.dataUsingEncoding(NSUTF8StringEncoding)
                        let resp = JSONDecoder(data!)
                        /*var error: NSError?
                        var response: AnyObject? = NSJSONSerialization.JSONObjectWithData(data!, options: NSJSONReadingOptions(), error: &error)*/
                        if (resp["code"].integer == 0) {
                            let res: Int = resp["data"]["id"].integer!
                            if (!title.isEmpty) {
                                self.postArticle(title, content: content, res: res)
                            }
                        }
                    })
                    },failure: {(error: NSError, response: HTTPResponse?) in
                        println(NSError)
                        println(response?.text!)
                        //error out on stuff
                })
            } else {
                if (!title.isEmpty) {
                    postArticle(title, content: content, res: 0)
                }
            }
        }
        
    }
    
    func postArticle(title: String, content: String, res: Int) {
        var params: Dictionary<String, AnyObject> = ["test": "test"]
        if (res == 0) {
            params = [
                "title": title,
                "content": content,
                //"labels": "[]",
                //"resources": "[]",
                "subjectId": "\(Config.shared.subjectId)"
            ]
        } else {
            params = [
                "title": title,
                "content": content,
                //"labels": "[]",
                "resources": "[\(res)]",
                "subjectId": "\(Config.shared.subjectId)"
            ]
        }
        HTTP.post("http://\(Config.shared.server)/cgi/article/create", params: params,
            success: {(response: HTTPResponse) -> Void in
                NSOperationQueue.mainQueue().addOperationWithBlock({
                    let resp = JSONDecoder(response.responseObject!)
                    if (resp["code"].integer != 0) {
                        println(resp["msg"].string)
                        self.action = true
                        self.activityIndicator.stopAnimating()
                    } else {
                        println("success")
                        self.performSegueWithIdentifier("postToSubject", sender: self)
                    }
                })
            }, failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
                NSOperationQueue.mainQueue().addOperationWithBlock({
                    self.action = true
                    self.activityIndicator.stopAnimating()
                })
            }
        )
    }

    
    
    @IBAction func showPhoto(sender: UIButton) {
        articleContentInputTextView.resignFirstResponder()
        articleTitleInputTextField.resignFirstResponder()
        photoOperateScrollView.hidden = false
        articleContentInputHeight.constant = 220 + 40
    }
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        articleContentInputTextView.layer.borderWidth = 1
        articleContentInputTextView.layer.borderColor = Theme.shared.cellBorderColor.CGColor
        articleContentInputTextView.layer.cornerRadius = 4.5
        articleContentInputTextView.text = ""
        
        articleTitleInputTextField.layer.borderWidth = 1
        articleTitleInputTextField.layer.borderColor = Theme.shared.cellBorderColor.CGColor
        articleTitleInputTextField.layer.cornerRadius = 4.5
        
        photoOperateScrollView.hidden = true
        
        registerKeyboardNotifications()
        
        picker.delegate = self
        picker.sourceType = UIImagePickerControllerSourceType.SavedPhotosAlbum
        picker.allowsEditing = true
        
        activityIndicator.stopAnimating()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // Call this method somewhere in your view controller setup code.
    func registerKeyboardNotifications() {
        let notificationCenter = NSNotificationCenter.defaultCenter()
        notificationCenter.addObserver(self,
            selector: "keyboardWillBeShown:",
            name: UIKeyboardWillShowNotification,
            object: nil)
        notificationCenter.addObserver(self,
            selector: "keyboardWillBeHidden:",
            name: UIKeyboardWillHideNotification,
            object: nil)
    }
    
    // Called when the UIKeyboardDidShowNotification is sent.
    func keyboardWillBeShown(sender: NSNotification) {
        photoOperateScrollView.hidden = true
        
        let info: NSDictionary = sender.userInfo!
        if let keyboardHeight = info[UIKeyboardFrameEndUserInfoKey]?.CGRectValue().size.height {
            articleContentInputHeight.constant = keyboardHeight + 40
            UIView.animateWithDuration(0.25, animations: { () -> Void in
                self.view.layoutIfNeeded()
            })
        }
    }
    
    // Called when the UIKeyboardWillHideNotification is sent
    func keyboardWillBeHidden(sender: NSNotification) {
        articleContentInputHeight.constant = 40
    }
    

    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        println(sender?.tag)
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    
    
    @IBAction func chooseImage(sender: AnyObject) {
        var alert:UIAlertController=UIAlertController(title: "选择图片", message: nil, preferredStyle: UIAlertControllerStyle.ActionSheet)
        
        var cameraAction = UIAlertAction(title: "拍照", style: UIAlertActionStyle.Default)
            {
                UIAlertAction in
                self.openCamera()
                
        }
        var gallaryAction = UIAlertAction(title: "相册", style: UIAlertActionStyle.Default)
            {
                UIAlertAction in
                self.openGallary()
        }
        var cancelAction = UIAlertAction(title: "取消", style: UIAlertActionStyle.Cancel)
            {
                UIAlertAction in
                
        }
        // Add the actions
        alert.addAction(cameraAction)
        alert.addAction(gallaryAction)
        alert.addAction(cancelAction)
        // Present the actionsheet
        if UIDevice.currentDevice().userInterfaceIdiom == .Phone
        {
            self.presentViewController(alert, animated: true, completion: nil)
        }
        else
        {
            popover=UIPopoverController(contentViewController: alert)
            popover!.presentPopoverFromRect(photoAddButton.frame, inView: self.view, permittedArrowDirections: UIPopoverArrowDirection.Any, animated: true)
        }
    }
    
    func openCamera()
    {
        if(UIImagePickerController.isSourceTypeAvailable(UIImagePickerControllerSourceType.Camera))
        {
            picker.sourceType = UIImagePickerControllerSourceType.Camera
            self.presentViewController(picker, animated: true, completion: { imageP in
                
            })
        }
    }
    func openGallary()
    {
        picker.sourceType = UIImagePickerControllerSourceType.PhotoLibrary
        if UIDevice.currentDevice().userInterfaceIdiom == .Phone
        {
            self.presentViewController(picker, animated: true, completion: { imageP in
                
            })
        }
        else
        {
            popover=UIPopoverController(contentViewController: picker)
            popover!.presentPopoverFromRect(photoAddButton.frame, inView: self.view, permittedArrowDirections: UIPopoverArrowDirection.Any, animated: true)
        }
    }
    
    func imagePickerController(picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [NSObject : AnyObject])
    {
        picker.dismissViewControllerAnimated(true, completion: nil)
        photoShow.image=(info[UIImagePickerControllerOriginalImage] as! UIImage)
        //sets the selected image to image view
    }
    func imagePickerControllerDidCancel(picker: UIImagePickerController)
    {
        println("picker cancel.")
    }
    
    

}
