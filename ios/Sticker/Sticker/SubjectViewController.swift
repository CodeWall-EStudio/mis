//
//  SubjectViewController.swift
//  Sticker
//
//  Created by Joey Chow on 5/21/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit
import SwiftHTTP
import JSONJoy

class SubjectViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    var subjectDetail = SubjectDetail()
    var articles = [Article]()
    var refreshControl = UIRefreshControl()
    
    @IBOutlet weak var articleTableview: UITableView!
    @IBOutlet weak var subjectImageView: UIImageView!
    @IBOutlet weak var subjectTitleLabel: UILabel!
    @IBOutlet weak var articleCountLabel: UILabel!
    @IBOutlet weak var memberCountLabel: UILabel!
    @IBOutlet weak var resourceCountLabel: UILabel!
    @IBOutlet weak var followsLabel: UILabel!
    @IBOutlet weak var creatorNameLabel: UILabel!
    @IBOutlet weak var creatTimeLabel: UILabel!
    @IBOutlet weak var updatorNameLabel: UILabel!
    @IBOutlet weak var updateTimeLabel: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        prepareForNavigation()
        prepareForTableView()
        
        getSubject("http://\(Config.shared.server)/cgi/subject/info?id=\(Config.shared.subjectId)")
        getArticles("http://\(Config.shared.server)/cgi/article/search?start=0&limit=100&subjectId=\(Config.shared.subjectId)&orderby=createTime")
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func prepareForNavigation() {
        let addButton:UIButton = UIButton.buttonWithType(UIButtonType.Custom) as! UIButton
        addButton.frame = CGRectMake(0, 0, 18, 18)
        addButton.setImage(UIImage(named:"Post"), forState: UIControlState.Normal)
        addButton.addTarget(self, action: "create:", forControlEvents: UIControlEvents.TouchUpInside)
        var addButtonItem: UIBarButtonItem = UIBarButtonItem(customView: addButton)
        navigationItem.setRightBarButtonItem(addButtonItem, animated: true)
    }
    
    func create(sender: AnyObject) {
        performSegueWithIdentifier("presentArticlePost", sender: self)
    }
    
    func prepareForTableView() {
        articleTableview.dataSource = self
        articleTableview.delegate = self
        articleTableview.tableFooterView = UIView(frame:CGRectZero)
        articleTableview.tableHeaderView = UIView(frame:CGRectZero)
        articleTableview.rowHeight = 100
        articleTableview.separatorStyle = UITableViewCellSeparatorStyle.None
        
        articleTableview.backgroundColor = Theme.shared.tableBackgroundColor
        self.view.backgroundColor = Theme.shared.tableBackgroundColor
        
        refreshControl.addTarget(self, action: "refresh", forControlEvents: UIControlEvents.ValueChanged)
        refreshControl.attributedTitle = NSAttributedString(string: "松手刷新")
        articleTableview.addSubview(refreshControl)
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
        
        cell.articleBackgroundView.layer.cornerRadius = Theme.shared.cellCornerRadius
        cell.articleBackgroundView.layer.borderWidth = 1
        cell.articleBackgroundView.layer.borderColor = Theme.shared.cellBorderColor.CGColor
        cell.backgroundColor = Theme.shared.tableBackgroundColor
        
        cell.articleTitleLabel.text = articles[indexPath.row].title!
        cell.articleContentLabel.text = articles[indexPath.row].content!
        //cell.articleContentLabel.text = "本店于十一期间特推出一系列优惠，限时限量敬请选购！沙发：钻石品质，首领风范！床垫：华贵典雅，彰显时尚！尊贵而不失奢华，典雅却不失自然！温馨和浪漫的生活，我们与你一同创造！"
        /*cell.articleContentLabel.sizeToFit()
        let h = cell.articleContentLabel.frame.size.height
        cell.articleContentHeight.constant += h - 21
        cell.frame = CGRectMake(0, 0, cell.frame.width, cell.frame.height + h - 21)*/
        cell.creatorNameLabel.text = "\(articles[indexPath.row].creatorName!)"
        let ct: String = articles[indexPath.row].createTime!
        cell.creatTimeLabel.text = (ct as NSString).substringToIndex(10)
        cell.tag = articles[indexPath.row].id!
        
        /*let r = arc4random_uniform(5) + 1
        cell.subjectImageView.image = UIImage(named: "Subject0\(r)")
        cell.subjectTitleLabel.text = "\(subjects[indexPath.row].title!)"
        cell.articleCountLabel.text = " \(subjects[indexPath.row].articleCount!)"
        cell.memberCountLabel.text = " \(subjects[indexPath.row].memberCount!)"
        cell.resourceCountLabel.text = " \(subjects[indexPath.row].resourceCount!)"
        cell.creatorNameLabel.text = "\(subjects[indexPath.row].creatorName!)"
        let ct: String = subjects[indexPath.row].createTime!
        cell.creatTimeLable.text = (ct as NSString).substringToIndex(10)
        let ut: String = subjects[indexPath.row].updateTime!
        cell.updateTimeLabel.text = (ut as NSString).substringToIndex(10)
        cell.tag = subjects[indexPath.row].id!*/
        
        return cell
    }
    
    func getSubject(url: String) {
        HTTP.get(
            url,
            success: {(response: HTTPResponse) -> Void in
                if (response.responseObject != nil) {
                    let resp = JSONDecoder(response.responseObject!)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        if (resp["code"].integer == 0) {
                            self.subjectDetail = SubjectDetail(resp["data"])
                            let r = arc4random_uniform(5) + 1
                            self.subjectImageView.image = UIImage(named: "Subject0\(r)")
                            self.subjectTitleLabel.text = self.subjectDetail.title!
                            self.articleCountLabel.text = " \(self.subjectDetail.articleCount!)"
                            self.memberCountLabel.text = " \(self.subjectDetail.memberCount!)"
                            self.resourceCountLabel.text = " \(self.subjectDetail.subjectResourceCount!)"
                            self.followsLabel.text = " \(self.subjectDetail.follow!)"
                            self.creatorNameLabel.text = self.subjectDetail.creatorName!
                            self.updatorNameLabel.text = self.subjectDetail.updatorName!
                            
                            let ct: String = self.subjectDetail.createTime!
                            self.creatTimeLabel.text = (ct as NSString).substringToIndex(10)
                            let ut: String = self.subjectDetail.updateTime!
                            self.updateTimeLabel.text = (ut as NSString).substringToIndex(10)
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

    func getArticles(url: String) {
        articles = []
        articleTableview.reloadData()
        HTTP.get(
            url,
            success: {(response: HTTPResponse) -> Void in
                if (response.responseObject != nil) {
                    let resp = JSONDecoder(response.responseObject!)
                    NSOperationQueue.mainQueue().addOperationWithBlock({
                        if (resp["code"].integer == 0) {
                            if (resp["code"].integer == 0) {
                                self.articles = Articles(resp["data"]).articles!
                                self.articleTableview.reloadData()
                            }
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
    
    func refresh() {
        getArticles("http://\(Config.shared.server)/cgi/article/search?start=0&limit=100&subjectId=\(Config.shared.subjectId)&orderby=createTime")
        refreshControl.endRefreshing()
    }


    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
        if (segue.identifier == "presentArticleView") {
            Config.shared.articleId = sender!.tag
        }
    }

    @IBAction func unwindToSubject(segue:UIStoryboardSegue) {
        if (segue.identifier == "postToSubject") {
            self.refresh()
        }
    }
}
