//
//  ArticleTableViewCell.swift
//  Sticker
//
//  Created by Joey Chow on 5/21/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit

class ArticleTableViewCell: UITableViewCell {

    @IBOutlet weak var articleBackgroundView: UIView!
    @IBOutlet weak var creatorNameLabel: UILabel!
    @IBOutlet weak var creatTimeLabel: UILabel!
    @IBOutlet weak var articleTitleLabel: UILabel!
    @IBOutlet weak var articleContentLabel: UILabel!
    @IBOutlet weak var articleContentHeight: NSLayoutConstraint!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
