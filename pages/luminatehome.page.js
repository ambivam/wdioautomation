const elementutil = require('../util/elementutil')
class LuminateHomePage{
    //Locators
    get luminatePortalDashboard(){ return $("//*[@id='root']/div/div[2]/div[2]/h1/div/div[1]") }

    //Actions
    getPageTitle(){
        return elementutil.doGetPageTitle()
    }

    getHomePageDescription(){
        return elementutil.doGetText(this.luminatePortalDashboard)
    }
}
module.exports = new LuminateHomePage();