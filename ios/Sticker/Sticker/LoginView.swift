//
//  LoginView.swift
//  Sticker
//
//  Created by Joey Chow on 5/17/15.
//  Copyright (c) 2015 Code Wall-E Studio. All rights reserved.
//

import UIKit
import NibDesignable

@IBDesignable
class LoginView: NibDesignable {

    @IBOutlet weak var loginFormView: UIView!
    @IBOutlet weak var loginFormConfirmButton: UIButton!
    @IBOutlet weak var loginUidTextField: UITextField!
    @IBOutlet weak var loginPasswdTextField: UITextField!
    @IBOutlet weak var loginActivityIndicatorView: UIActivityIndicatorView!
    @IBOutlet weak var loginHelpButton: UIButton!
    @IBOutlet weak var loginConfigButton: UIButton!
    @IBAction func loginFormConfirmButtonClick(sender: UIButton) {
        loginStart()
    }
    @IBAction func loginFormClick(sender: AnyObject) {
        loginUidTextField.resignFirstResponder()
        loginPasswdTextField.resignFirstResponder()
    }
    @IBAction func loginFormTextEdit(sender: UITextField) {
        sender.layer.borderWidth = 1
        sender.layer.borderColor = Theme.shared.loginBackgroundColor.CGColor
        sender.layer.cornerRadius = Theme.shared.cornerRadius
        /*if (sender.tag == 1) {
            sender.leftView = uidImageView
        }
        if (sender.tag == 2) {
            sender.leftView = passwdImageView
        }*/
        loginFormConfirmButton.enabled = true
    }
    @IBAction func loginFormTextEdited(sender: UITextField) {
        sender.layer.borderWidth = 0
        /*if (sender.tag == 1) {
            sender.leftView = uidGrayImageView
        }
        if (sender.tag == 2) {
            sender.leftView = passwdGrayImageView
        }*/
    }
    @IBAction func loginFormTextBlur(sender: AnyObject) {
        if (sender.tag == 1) {
            loginPasswdTextField.becomeFirstResponder()
        }
        if (sender.tag == 2) {
            loginFormConfirmButton.sendActionsForControlEvents(UIControlEvents.TouchUpInside)
        }
    }
    
    // Only override drawRect: if you perform custom drawing.
    // An empty implementation adversely affects performance during animation.
    override func drawRect(rect: CGRect) {
        // Drawing code
        
        //let uidGrayImageView = UIImageView(image: UIImage(named:"UidGray")!)
        let uidImageView = UIImageView(image: UIImage(named:"Uid")!)
        //let passwdGrayImageView = UIImageView(image: UIImage(named:"PasswdGray")!)
        let passwdImageView = UIImageView(image: UIImage(named:"Passwd")!)
        
        // draw form
        loginFormView.layer.cornerRadius = Theme.shared.cornerRadius
        
        // draw button
        loginFormConfirmButton.layer.cornerRadius = Theme.shared.cornerRadius
        loginFormConfirmButton.layer.backgroundColor = Theme.shared.loginBackgroundColor.CGColor
        
        loginUidTextField.layer.borderWidth = 0
        loginUidTextField.layer.backgroundColor = UIColor.whiteColor().CGColor
        loginUidTextField.layer.cornerRadius = Theme.shared.cornerRadius
        
        loginPasswdTextField.layer.borderWidth = 0
        loginPasswdTextField.layer.backgroundColor = UIColor.whiteColor().CGColor
        loginPasswdTextField.layer.cornerRadius = Theme.shared.cornerRadius
        
        // draw text field
        //uidGrayImageView.frame = CGRect(x: 0, y: 0, width: 31, height: 16)
        uidImageView.frame = CGRect(x: 0, y: 0, width: 31, height: 16)
        //passwdGrayImageView.frame = CGRect(x: 0, y: 0, width: 31, height: 16)
        passwdImageView.frame = CGRect(x: 0, y: 0, width: 31, height: 16)
        
        loginUidTextField.leftViewMode = UITextFieldViewMode.Always
        loginPasswdTextField.leftViewMode = UITextFieldViewMode.Always
        loginUidTextField.leftView = uidImageView
        loginPasswdTextField.leftView = passwdImageView
        
        loginActivityIndicatorView.hidden = true

    }
    
    // MARK: Interface Builder
    override func prepareForInterfaceBuilder() {
    }

    func loginStart() {
        loginActivityIndicatorView.hidden = false
        loginActivityIndicatorView.startAnimating()
        loginFormConfirmButton.enabled = false
    }
    
    func loginEnd() {
        loginActivityIndicatorView.stopAnimating()
        loginActivityIndicatorView.hidden = true
        loginFormConfirmButton.enabled = true
    }
}
