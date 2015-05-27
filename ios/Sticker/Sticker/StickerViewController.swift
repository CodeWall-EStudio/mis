//
//  StickerViewController.swift
//  Sticker
//
//  Created by Joey Chow on 5/18/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit

class StickerViewController: UIViewController {

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
    
    // 设置navigation bar item
    func prepareForNavigationBarItems(viewController: UIViewController, isHome: Bool, isBack: Bool, title: String, action: Selector) {
        
        // left navigation bar items
        var items = [UIBarButtonItem]()
        if (isHome) {
            let homeButton:UIButton = UIButton.buttonWithType(UIButtonType.Custom) as! UIButton
            homeButton.frame = CGRectMake(0, 0, 22, 22)
            homeButton.setImage(UIImage(named:"Icon"), forState: UIControlState.Normal)
            homeButton.addTarget(viewController, action: action, forControlEvents: UIControlEvents.TouchUpInside)
            var homeButtonItem: UIBarButtonItem = UIBarButtonItem(customView: homeButton)
            items.append(homeButtonItem)
        } else {
            /*let backButton:UIButton = UIButton.buttonWithType(UIButtonType.Custom) as! UIButton
            backButton.frame = CGRectMake(0, 0, 12, 18)
            backButton.setImage(UIImage(named:"Back"), forState: UIControlState.Normal)
            backButton.addTarget(viewController, action: action, forControlEvents: UIControlEvents.TouchUpInside)
            var backButtonItem: UIBarButtonItem = UIBarButtonItem(customView: backButton)
            items.append(backButtonItem)
            
            let titleLabel:UILabel = UILabel(frame:CGRectMake(0, 0, 48, 24))
            titleLabel.text = title
            titleLabel.font = UIFont(name: "Arial", size: 16)
            titleLabel.textColor = Theme.shared.titleTextColor
            titleLabel.adjustsFontSizeToFitWidth = true
            var titleButtonItem: UIBarButtonItem = UIBarButtonItem(customView: titleLabel)
            items.append(titleButtonItem)
            var tap:UITapGestureRecognizer = UITapGestureRecognizer(target: viewController, action: action)
            titleLabel.userInteractionEnabled = true
            titleLabel.addGestureRecognizer(tap)*/
        }
        viewController.navigationItem.setLeftBarButtonItems(items, animated: true)
    }
}
