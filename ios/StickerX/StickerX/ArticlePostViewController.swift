//
//  ArticlePostViewController.swift
//  StickerX
//
//  Created by Joey Chow on 4/18/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit

class ArticlePostViewController: UIViewController, UIAlertViewDelegate,UIImagePickerControllerDelegate,UINavigationControllerDelegate,UIPopoverControllerDelegate {

    @IBOutlet weak var articleTitle: UITextField!
    @IBOutlet weak var articleContent: UITextView!
    @IBOutlet weak var addImage: UIButton!
    @IBOutlet weak var showImage: UIImageView!
    var picker:UIImagePickerController=UIImagePickerController()
    var popover:UIPopoverController?=nil
    
    @IBOutlet weak var articleContentBottom: NSLayoutConstraint!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        articleContent.layer.borderWidth = 1
        articleContent.layer.borderColor = UIColor(red: 0.925, green: 0.941, blue: 0.945, alpha: 1).CGColor
        articleContent.layer.cornerRadius = 4.5
        articleContent.text = ""
        
        registerKeyboardNotifications()
        
        picker.delegate = self
        picker.sourceType = UIImagePickerControllerSourceType.SavedPhotosAlbum
        picker.allowsEditing = true
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
        let info: NSDictionary = sender.userInfo!
        let value: NSValue = info.valueForKey(UIKeyboardFrameBeginUserInfoKey) as! NSValue
        let keyboardSize: CGSize = value.CGRectValue().size
        
        println(keyboardSize)
        println(self.articleContentBottom.constant)
        self.articleContentBottom.constant = 50 + keyboardSize.height
        println(self.articleContentBottom.constant)
        
        //self.view.frame. = self.view.frame.height - keyboardSize.height
        /*let info: NSDictionary = sender.userInfo!
        let value: NSValue = info.valueForKey(UIKeyboardFrameBeginUserInfoKey) as! NSValue
        let keyboardSize: CGSize = value.CGRectValue().size
        
        let viewHeight = self.view.frame.height
        let activeTextFieldRect: CGRect? = activeTextField?.frame
        let activeTextFieldHeight: CGFloat? = activeTextFieldRect?.height
        let activeTextFieldOrigin: CGPoint? = activeTextFieldRect?.origin
        let activeTextFieldOriginY: CGFloat? = activeTextFieldOrigin?.y
        let minusValue = viewHeight/2 - activeTextFieldOriginY! - activeTextFieldHeight!/2 - keyboardSize.height
        
        if (minusValue < 0) {
            UIView.animateWithDuration(0.5, animations: {self.view.frame.origin.y = minusValue/2 - activeTextFieldHeight!
            })
        }*/
    }
    
    // Called when the UIKeyboardWillHideNotification is sent
    func keyboardWillBeHidden(sender: NSNotification) {
        //view.frame.origin.y = 0
    }
    

    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    /*override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        println(sender?.tag)
    }*/

    @IBAction func chooseImage(sender: AnyObject) {
        var alert:UIAlertController=UIAlertController(title: "Choose Image", message: nil, preferredStyle: UIAlertControllerStyle.ActionSheet)
        
        var cameraAction = UIAlertAction(title: "Camera", style: UIAlertActionStyle.Default)
            {
                UIAlertAction in
                self.openCamera()
                
        }
        var gallaryAction = UIAlertAction(title: "Gallary", style: UIAlertActionStyle.Default)
            {
                UIAlertAction in
                self.openGallary()
        }
        var cancelAction = UIAlertAction(title: "Cancel", style: UIAlertActionStyle.Cancel)
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
            popover!.presentPopoverFromRect(addImage.frame, inView: self.view, permittedArrowDirections: UIPopoverArrowDirection.Any, animated: true)
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
            popover!.presentPopoverFromRect(addImage.frame, inView: self.view, permittedArrowDirections: UIPopoverArrowDirection.Any, animated: true)
        }
    }
    
    func imagePickerController(picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [NSObject : AnyObject])
    {
        picker.dismissViewControllerAnimated(true, completion: nil)
        showImage.image=(info[UIImagePickerControllerOriginalImage] as! UIImage)
        //sets the selected image to image view
    }
    func imagePickerControllerDidCancel(picker: UIImagePickerController)
    {
        println("picker cancel.")
    }
    @IBAction func showImageUpload(sender: AnyObject) {
        articleContent.resignFirstResponder()
    }
}
