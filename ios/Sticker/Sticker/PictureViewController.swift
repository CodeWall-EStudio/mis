//
//  PictureViewController.swift
//  Sticker
//
//  Created by Joey Chow on 5/22/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit

class PictureViewController: UIViewController {

    @IBOutlet weak var picImageView: UIImageView!
    @IBAction func backAction(sender: AnyObject) {
        self.dismissViewControllerAnimated(true, completion:nil)
    }
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
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
