//
//  ArticleTableViewCell.swift
//  StickerX
//
//  Created by Joey Chow on 4/18/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit

class ArticleTableViewCell: UITableViewCell {

    @IBOutlet weak var articleCreator: UILabel!
    @IBOutlet weak var articleTitle: UILabel!
    @IBOutlet weak var articleContent: UITextView!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}
