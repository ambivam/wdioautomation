const elementutil = require('../util/elementutil')

class IngestionStatusPage{

    get dataEvents(){ 
        //return $("#root > div > div > div.MuiBox-root.jss19.jss10 > div.MuiBox-root.jss20 > h3")
        return $("//*[@id='root']/div/div/div[2]/div/div/div/h2")
    }

    get searchIngestedData(){
        return $("//*[@id='search']")
    }

    get sourceSearch(){
        return $("//*[@id='syetms']")
    }

    getIngestionStatusPageDescription(){
        //elementutil.doSwitchToFrame(this.appFrame)
        elementutil.logInfo('Getting Ingestion Status Page Description')
        return elementutil.doGetText(this.dataEvents)
    }

    setSearchIngestedData(searchinput){
        elementutil.logInfo('Entering Search Ingested Data')
        elementutil.doSetValue(this.searchIngestedData,searchinput)
    }

    setSearchSource(searchinput){
        elementutil.logInfo('Entering Source Search Data')
        elementutil.doSetValue(this.sourceSearch,searchinput)
    }
}

module.exports = new IngestionStatusPage();