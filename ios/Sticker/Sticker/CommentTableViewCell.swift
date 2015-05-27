//
//  CommentTableViewCell.swift
//  Sticker
//
//  Created by Joey Chow on 5/22/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit

class CommentTableViewCell: UITableViewCell {

    @IBOutlet weak var creatorNameLabel: UILabel!
    @IBOutlet weak var creatTimeLabel: UILabel!
    @IBOutlet weak var commentContentLabel: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
