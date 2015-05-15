//
//  LoginSwitchViewController.swift
//  StickerX
//
//  Created by Joey Chow on 5/1/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit

class LoginSwitchViewController: UIViewController, UIPickerViewDataSource,UIPickerViewDelegate {

    @IBOutlet weak var switchPicker: UIPickerView!
    
    let pickerData = [
        Server(title: "第一小学", domain: "mis.codewalle.com"),
        Server(title: "第二小学", domain: "media-test.hylc-edu.cn")
    ]
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        switchPicker.dataSource = self
        switchPicker.delegate = self
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int {
        return 1
    }
    func pickerView(pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return pickerData.count
    }
    
    func pickerView(pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String! {
        return pickerData[row].title
    }
    
    func pickerView(pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        STUser.shared.server = pickerData[row].domain
        let defaults = NSUserDefaults.standardUserDefaults()
        defaults.setObject(STUser.shared.server!, forKey: "server")
        //myLabel.text = pickerData[row]
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
