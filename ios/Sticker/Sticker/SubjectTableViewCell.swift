//
//  SubjectTableViewCell.swift
//  Sticker
//
//  Created by Joey Chow on 5/19/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit

class SubjectTableViewCell: UITableViewCell {

    @IBOutlet weak var subjectImageView: UIImageView!
    @IBOutlet weak var subjectTitleLabel: UILabel!
    @IBOutlet weak var subjectBackgroundView: UIView!
    @IBOutlet weak var articleCountLabel: UILabel!
    @IBOutlet weak var memberCountLabel: UILabel!
    @IBOutlet weak var resourceCountLabel: UILabel!
    @IBOutlet weak var creatorNameLabel: UILabel!
    @IBOutlet weak var creatTimeLable: UILabel!
    @IBOutlet weak var updateTimeLabel: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
