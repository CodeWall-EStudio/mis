//
//  ServerViewController.swift
//  Sticker
//
//  Created by Joey Chow on 5/17/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit

class ServerViewController: StickerViewController, UIPickerViewDataSource,UIPickerViewDelegate {

    @IBOutlet weak var serverPickerView: UIPickerView!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        serverPickerView.dataSource = self
        serverPickerView.delegate = self
        
        for var i = 0; i < Config.shared.servers.count; i++ {
            if (Config.shared.servers[i].domain == Config.shared.server) {
                serverPickerView.selectRow(i, inComponent:0, animated:true)
            }
        }
        
        //prepareForNavigationBarItems(self, navigationItem: self.navigationController!.navigationItem, isHome: false, isBack: true, title: "返回", action: "cancel:")
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func numberOfComponentsInPickerView(pickerView: UIPickerView) -> Int {
        return 1
    }
    func pickerView(pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return Config.shared.servers.count
    }
    
    func pickerView(pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String! {
        return Config.shared.servers[row].title
    }
    
    func pickerView(pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        Config.shared.server = Config.shared.servers[row].domain
        let defaults = NSUserDefaults.standardUserDefaults()
        defaults.setObject(Config.shared.server, forKey: "server")
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
