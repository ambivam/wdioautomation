const elementutil = require('../util/elementutil')
const webdriverconstants = require('../config/webdriver.constants')
const logindata = require('../testdata/logindata')
const luminateurls = require('../config/luminate.app.constants')
//const methodutil = require('../util/methodutil')

class LuminatePortalLoginPage{
    get loginEmail(){ 
        return $("//input[@id='i0116']")
    }
    get loginButton(){
        return $("//*[@id='idSIButton9']")
    }

    get loginPassword(){
        return $("//input[@id='i0118']")
    }

    loginLuminatePortal(){
        elementutil.logInfo('INTO LOGIN PORTAL FUNCTION')
        console.log('INTO LOGIN PORTAL FUNCTION')
        
        elementutil.doLaunch(luminateurls.LuminatAppURL)
        //elementutil.doLaunch("/")
        elementutil.doPause(elementutil.doPause(webdriverconstants.INTERMETTENT_PAUSE))
        elementutil.doSwitchToWindow(1)
        elementutil.doGetPageTitle()
        elementutil.logInfo('Entering email in User Email Field')
        if(elementutil.doIsDisplayed(this.loginEmail)){
            elementutil.doSetValue(this.loginEmail,logindata.username)
        }
        elementutil.logInfo('Clicking on Next button of Login Dialog')
        if(elementutil.doIsDisplayed(this.loginButton)){
            elementutil.doclick(this.loginButton)
        }
        elementutil.logInfo('Entering Password in User Password Field')
        if(elementutil.doIsDisplayed(this.loginPassword)){
            elementutil.doSetValue(this.loginPassword,logindata.password)
        }

        elementutil.logInfo('Clicking on Next button of Login Dialog')
        if(elementutil.doIsDisplayed(this.loginButton)){
            elementutil.doclick(this.loginButton)
        }

        elementutil.logInfo('Clicking on Yes button of Login Dialog')
        if(elementutil.doIsDisplayed(this.loginButton)){
            elementutil.doclick(this.loginButton)
        }
        elementutil.doPause()
        elementutil.doSwitchToWindow(0)
        elementutil.doMaximizeWindow()
        elementutil.doIsDocumentReady()
    }
}
module.exports = new LuminatePortalLoginPage();