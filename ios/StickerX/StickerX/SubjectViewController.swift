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
        
        let subjectId = STUser.shared.selectedSubjectId!
        getSubjectx("http://mis.codewalle.com/cgi/subject/info?id=\(subjectId)")
        getArticles("http://mis.codewalle.com/cgi/article/search?start=0&limit=100&subjectId=\(subjectId)")
        
        refreshControl.addTarget(self, action: "refreshData", forControlEvents: UIControlEvents.ValueChanged)
        refreshControl.attributedTitle = NSAttributedString(string: "松手刷新")
        mainTableView.addSubview(refreshControl)
    }
    
    func refreshData() {
        getArticles("http://mis.codewalle.com/cgi/article/search?start=0&limit=100&subjectId=\(STUser.shared.selectedSubjectId!)")
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
            if (!title.isEmpty) {
                postArticle(title, content: content)
            }
        }
    }

    
    func postArticle(title: String, content: String) {
        let subjectId = STUser.shared.selectedSubjectId!
        var uri = "http://mis.codewalle.com/cgi/article/create"
        var params: Dictionary<String, AnyObject> = [
            "title": title,
            "content": content,
            //"labels": "[]",
            //"resources": "[]",
            "subjectId": "\(subjectId)"
        ]
        postHTTP(uri, params: params,
            success: {(response: HTTPResponse) -> Void in
                NSOperationQueue.mainQueue().addOperationWithBlock({
                    let resp = JSONDecoder(response.responseObject!)
                    if (resp["code"].integer != 0) {
                        println(resp["msg"].string)
                    } else {
                        println("success")
                        self.getArticles("http://mis.codewalle.com/cgi/article/search?start=0&limit=100&subjectId=\(subjectId)")
                    }
                })
            }, failure: {(error: NSError, response: HTTPResponse?) -> Void in
                println(error)
            }
        )
    }
}
