//
//  ArticlePostViewController.swift
//  StickerX
//
//  Created by Joey Chow on 4/18/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit

class ArticlePostViewController: StickerViewController {

    @IBOutlet weak var articleTitle: UITextField!
    @IBOutlet weak var articleContent: UITextView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        articleContent.layer.borderWidth = 1
        articleContent.layer.borderColor = Constants.gray.CGColor
        articleContent.layer.cornerRadius = 4.5
        articleContent.text = ""
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
