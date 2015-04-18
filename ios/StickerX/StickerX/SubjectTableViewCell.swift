//
//  SubjectTableViewCell.swift
//  StickerX
//
//  Created by Joey Chow on 4/15/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit

class SubjectTableViewCell: UITableViewCell {

    @IBOutlet weak var title: UILabel!
    @IBOutlet weak var creator: UILabel!
    @IBOutlet weak var creatTime: UILabel!
    @IBOutlet weak var updator: UILabel!
    @IBOutlet weak var memberCount: UILabel!
    @IBOutlet weak var articleCount: UILabel!
    @IBOutlet weak var resourceCount: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }

}
