//
//  SubjectViewController.swift
//  StickerX
//
//  Created by Joey Chow on 4/18/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit
import SwiftHTTP
import JSONJoy

class SubjectViewController: StickerViewController, UITableViewDelegate, UITableViewDataSource {

    var articles = [Article]()
    
    var subjectId = 0
    
    @IBOutlet weak var subjectTitle: UILabel!
    @IBOutlet weak var subjectCreator: UILabel!
    @IBOutlet weak var subjectCreatTime: UILabel!
    @IBOutlet weak var subjectUpdateTime: UILabel!
    
    @IBOutlet weak var mainTableView: UITableView!
    
    var refreshControl = UIRefreshControl()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        mainTableView.dataSource = self
        mainTableView.delegate = self
        mainTableView.tableFooterView = UIView(frame:CGRectZero)
        mainTableView.rowHeight = 107
        
        subjectId = STUser.shared.selectedSubjectId!
        getSubjectx("http://\(STUser.shared.server!)/cgi/subject/info?id=\(subjectId)")
        getArticles("http://\(STUser.shared.server!)/cgi/article/search?start=0&limit=100&subjectId=\(subjectId)")
        
        refreshControl.addTarget(self, action: "refreshData", forControlEvents: UIControlEvents.ValueChanged)
        refreshControl.attributedTitle = NSAttributedString(string: "松手刷新")
        mainTableView.addSubview(refreshControl)
    }
    
    func refreshData() {
        getArticles("http://\(STUser.shared.server!)/cgi/article/search?start=0&limit=100&subjectId=\(STUser.shared.selectedSubjectId!)")
        refreshControl.endRefreshing()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // table
    func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return articles.count
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("ArticleCell", forIndexPath: indexPath) as! ArticleTableViewCell
        
        cell.articleCreator.text = articles[indexPath.row].creatorName
        cell.articleTitle.text = articles[indexPath.row].title
        cell.articleContent.text = articles[indexPath.row].content
        cell.tag = articles[indexPath.row].id!
        return cell
    }

    
    func getSubjectx(uri: String) {
        self.getHTTP(
            uri,
            success: {(response: HTTPResponse) -> Void in
                if (response.responseObject != nil) {
                    let resp = JSONDecoder(response.responseObject!)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        if (resp["code"].integer == 0) {
                            let data = Subjectx(resp["data"])
                            self.subjectTitle.text = data.title
                            self.subjectCreator.text = data.creatorName
                            self.subjectCreatTime.text = (data.createTime! as NSString).substringToIndex(10)
                            self.subjectUpdateTime.text = (data.updateTime! as NSString).substringToIndex(10)
                        }
                    })
                } else {
                    /*NSOperationQueue.mainQueue().addOperationWithBlock({
                    })*/
                }
            },
            failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
                /*NSOperationQueue.mainQueue().addOperationWithBlock({
                })*/
            }
        )
    }
    
    func getArticles(uri: String) {
        self.articles = []
        self.mainTableView.reloadData()
        self.getHTTP(
            uri,
            success: {(response: HTTPResponse) -> Void in
                if (response.responseObject != nil) {
                    let resp = JSONDecoder(response.responseObject!)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        if (resp["code"].integer == 0) {
                            self.articles = Articles(resp["data"]).articles!
                            self.mainTableView.reloadData()
                        }
                    })
                } else {
                    /*NSOperationQueue.mainQueue().addOperationWithBlock({
                    })*/
                }
            },
            failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
                /*NSOperationQueue.mainQueue().addOperationWithBlock({
                })*/
            }
        )
    }

    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
        if (segue.identifier == "articleSegue") {
            STUser.shared.selectedArticleId = sender!.tag
        }
    }

    @IBAction func unwindToSubject(segue:UIStoryboardSegue) {
    }
    
    @IBAction func postToSubject(segue:UIStoryboardSegue) {
        if (segue.sourceViewController.isKindOfClass(ArticlePostViewController)) {
            var svc = segue.sourceViewController as! ArticlePostViewController
            let title = svc.articleTitle.text
            let content = svc.articleContent.text
            if (svc.showImage.image != nil) {
                //var imageData: NSData = UIImagePNGRepresentation(svc.showImage.image)
                let imageData: NSData = UIImageJPEGRepresentation(svc.showImage.image, 0.4)
                var request = HTTPTask()
                if let sid = STUser.shared.sid {
                    request.requestSerializer = HTTPRequestSerializer()
                    request.requestSerializer.headers["Cookie"] = "sid=\"\(sid)\""
                }
                request.POST("http://\(STUser.shared.server!)/cgi/resource/upload", parameters:  ["aParam": "aValue", "file": HTTPUpload(data: imageData, fileName: "image", mimeType: "image/jpeg")], success: {(response: HTTPResponse) in
                    
                    println(response.text())
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        var nsString: NSString = response.text()!
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
                        println(response?.text())
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
        let subjectId = STUser.shared.selectedSubjectId!
        var uri = "http://\(STUser.shared.server!)/cgi/article/create"
        var params: Dictionary<String, AnyObject> = ["test": "test"]
        if (res == 0) {
            params = [
                "title": title,
                "content": content,
                //"labels": "[]",
                //"resources": "[]",
                "subjectId": "\(subjectId)"
            ]
        } else {
            params = [
                "title": title,
                "content": content,
                //"labels": "[]",
                "resources": "[\(res)]",
                "subjectId": "\(subjectId)"
            ]
        }
        postHTTP(uri, params: params,
            success: {(response: HTTPResponse) -> Void in
                NSOperationQueue.mainQueue().addOperationWithBlock({
                    let resp = JSONDecoder(response.responseObject!)
                    if (resp["code"].integer != 0) {
                        println(resp["msg"].string)
                    } else {
                        println("success")
                        self.getArticles("http://\(STUser.shared.server!)/cgi/article/search?start=0&limit=100&subjectId=\(self.subjectId)")
                    }
                })
            }, failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
            }
        )
    }
}
