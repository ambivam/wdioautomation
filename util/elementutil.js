const customexceptions = require('../util/customexceptions')
const frameworkStrings = require('../config/framework.strings')
const webdriverconstants = require('../config/webdriver.constants')
//const frameworkStrings = require('../config/framework.strings')
const luminateurls = require('../config/luminate.app.constants')
//const webdriverconstants = require('../config/webdriver.constants')
const {addStep} = require('@wdio/allure-reporter').default
const {addAttachment} = require('@wdio/allure-reporter').default

class UtilElements{

    doclick(element){
        try{
            this.logInfo(frameworkStrings.CLICK_ACTION+element.toString())
            this.doPause(webdriverconstants.INTERMETTENT_PAUSE)
            element.waitForDisplayed()
            element.click()
            this.doPause(webdriverconstants.INTERMETTENT_PAUSE)
        }catch(err){
            this.logInfo(frameworkStrings.CLICK_ACTION_ERROR+element,frameworkStrings.FAIL)
        }
    }

    doNavigateTo(url){
        try{
            this.logInfo('Navigating to url'+url)
            browser.navigateTo(url)
        }catch(err){
            this.logInfo(frameworkStrings.BROWSER_NAVIGATE_ERROR,frameworkStrings.FAIL)
        }
        
    }

    doPause(sec){
        browser.pause(sec)
    }

    doSwitchToWindow(handleNo){
        try{
            this.logInfo('Performing switching window handles action')
            let windowhndle = browser.getWindowHandles()
            browser.switchToWindow(windowhndle[handleNo])
        }catch(err){
            this.logInfo(frameworkStrings.BROWSER_WINDOW_HANDLES,frameworkStrings.FAIL)
        }
        
    }

    doLaunch(url){
        try{
            this.logInfo('Launching URL '+url)
            browser.url(url)
            this.doMaximizeWindow()
        }catch(err){
            this.logInfo(frameworkStrings.ENVIRONMENT_ISSUE,frameworkStrings.FAIL)
        }
    }

    doSetValue(element,value){
        try{
            this.logInfo('Entering text '+value+' in the Textbox')
            element.waitForDisplayed()
            element.setValue(value)

        }catch(err){
            this.logInfo(frameworkStrings.TEXT_INPUT_ERROR + element.toString(),frameworkStrings.FAIL) 
        }
        
    }
    
    doGetText(element){
        try{
            this.logInfo('Retreiving the text of the element')
            element.waitForDisplayed()
            return element.getText()

        }catch(err){
            this.logInfo(frameworkStrings.ELEMENT_NOT_PRESENT + element.toString(),frameworkStrings.FAIL) 
        }
        
    }

    doMaximizeWindow(){
        try{
            this.logInfo('Maximizing the window') 
            browser.maximizeWindow()
            this.doPause(webdriverconstants.INTERMETTENT_PAUSE)
        }catch(err){
            this.logInfo(frameworkStrings.BROWSER_MAXIMIZE,frameworkStrings.FAIL) 
        }
        
    }

    doIsDocumentReady(){
        let loaded
        try{
            this.logInfo('Waiting for document to get loaded') 
            loaded = browser.waitUntil(()=>{
                console.log('Waiting for document to get loaded ')            
                console.log(browser.execute('return document.readyState'))
                return browser.execute('return document.readyState') === 'complete'
            },webdriverconstants.ELEMENT_TIMEOUT,frameworkStrings.PAGE_NOT_LOADED
            )
            this.logInfo('Is document loading complete'+ loaded) 
        }catch(err){
            if(!loaded){
                this.logInfo(frameworkStrings.DOCUMENT_LOADING_STATUS,frameworkStrings.FAIL) 
            }
        }
        
    }

    doGetPageTitle(){    
        try{
            let title
            this.logInfo('Retrieving page title') 
            if(this.doIsDocumentReady()){
                title = browser.getTitle()
            }
            this.logInfo('Retrieved page title '+ title) 
            return title
        }catch(err){
            this.logInfo(frameworkStrings.PAGE_TITLE_ERROR,frameworkStrings.FAIL) 
        }
        
    }

    doIsDisplayed(element){

        element.waitForDisplayed(()=>
            { 
                timeout: webdriverconstants.ELEMENT_TIMEOUT
            }
            );
            if(!element.isDisplayed()){
                methodutil.logInfo(frameworkStrings.ELEMENT_NOT_PRESENT+element,frameworkStrings.FAIL) 
            }
            return element.isDisplayed()
    }

    doSelectValue(element,value){
        try{
            this.logInfo('Performing select action') 
            element.waitForDisplayed()
            element.selectByVisibleText(value)
            this.logInfo('Selected the value '+value) 
        }catch(err){
            this.logInfo(frameworkStrings.SELECT_DROPDOWN_ERROR+element.toString(),frameworkStrings.FAIL) 
        }
        
    }

    doCloseBrowser(){
        this.logInfo('Closing the browser')        
        browser.reloadSession()
    }

    doSwitchToFrame(element){
        //this.doPause(15000)
        let frameDisplayed = false
        let i = 0
        this.logInfo('Performing Switching frames action') 
        while(!frameDisplayed ){
            try{
                this.doPause(2000)
                i = i+1
                if(i>webdriverconstants.CUSTOM_TIMEOUT_ITERATOR) break;
                browser.switchToFrame(element) 
                frameDisplayed =  true
                console.log('Switched to frame successfully')
            }catch(err){ 
                this.logInfo(frameworkStrings.FRAMEWORK_SWITCHING_ERROR,frameworkStrings.FAIL) 
            }
        }

                
        // let apploaded = browser.waitUntil(()=>{
        //      console.log('Waiting for frame to be displayed ')
             
        //      return (element.isDisplayed() === true && element.isEnabled() === true)
              
        //    },50000,"My Apps Frame is not displayed"
        //    )
        
        //   if(apploaded){
        //       console.log('Frame loaded successfully ')
        //       browser.switchToFrame(element) 
        //       console.log('Switched to frame successfully')
        //   }

        //*********************************************************
        //console.log('Frame loaded successfully ')
        //browser.switchToFrame(element) 
        

        //*********************************************************

    }

    logInfo(description,status=frameworkStrings.PASS){
        addStep(description,{},status)
        if(status == frameworkStrings.FAIL){
            addAttachment(frameworkStrings.ATTACHMENT, Buffer.from(browser.takeScreenshot(), "base64"), "image/png")
            assert.isTrue(false,'Test Case failed')
        }        
    }

    captureScreenshot(){
        addAttachment(frameworkStrings.ATTACHMENT, Buffer.from(browser.takeScreenshot(), "base64"), "image/png")
    }

    logError(description,status=frameworkStrings.FAIL){
        addStep(description,{},status)
    }

    //****************************************************************** */
    navigateTo(page){
        this.logInfo('Navigating '+page+' Page ')
        this.logInfo('luminateurls.AppPage: '+luminateurls.AppPage)
        switch(page) {
            case luminateurls.AppPage:
                this.doNavigateTo(luminateurls.AppURL)
                this.doPause(webdriverconstants.INTERMETTENT_PAUSE)
                this.doIsDocumentReady()
                //this.logInfo("Loaded page description is :"+pageAppElements.getAppPageDescription())                
                break;
            case luminateurls.AnalyticsPage:
                this.doNavigateTo(luminateurls.AnalyticsURL)
                break;
            case luminateurls.HomePage:
                this.doNavigateTo(luminateurls.HomeURL)
                console.log(pageHomeElements.getHomePageDescription())
                break;
            default:
              // code block
          }
    }

    launchDataMaintenance(url){
        this.logInfo('Launching Data Mainatenance App ')
        this.doLaunch(url)
    }


    //****************************************************************** */

}

module.exports = new UtilElements()