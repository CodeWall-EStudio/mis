//
//  Theme.swift
//  Sticker
//
//  Created by Joey Chow on 5/17/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import Foundation
import UIKit

private let sharedInstance = Theme()

class Theme  {
    class var shared : Theme {
        return sharedInstance
    }
    
    var titleBackgroundColor : UIColor = UIColor(red: 52/255, green: 73/255, blue: 94/255, alpha: 1)
    var titleTextColor : UIColor = UIColor.whiteColor()
    
    var loginBackgroundColor : UIColor = UIColor(red: 26/255, green: 188/255, blue: 156/255, alpha: 1)
    
    var textBorderColor : UIColor = UIColor(red: 236/255, green: 240/255, blue: 241/255, alpha: 1)
    
    var tableBackgroundColor = UIColor(red: 235/255, green: 237/255, blue: 240/255, alpha: 1)
    var cellBorderColor = UIColor(red: 217/255, green: 218/255, blue: 219/255, alpha: 1)
    
    var tabbarBackgroundColor = UIColor(red: 246/255, green: 247/255, blue: 247/255, alpha: 1)

    
    var cornerRadius : CGFloat = 4.5
    
    var cellCornerRadius: CGFloat = 3
}