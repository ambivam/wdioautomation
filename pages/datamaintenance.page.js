const elementutil = require('../util/elementutil')

class DataMaintenancePage{

    get datamaintenance(){ 
        //return $("#root > div > div > div.MuiBox-root.jss19.jss10 > div.MuiBox-root.jss20 > h3")
        return $("//*[@id='root']/div/div/div[2]/div[1]/h3")
    }

    get entityData(){
        //return $("//*[@id='root']//button[@class='MuiButtonBase-root MuiTab-root MuiTab-textColorInherit']/span[contains(text(),'Entity')]")
        return $("//*[@id='root']/div/div/div[2]/div[2]/div[1]/div/div/div[2]/div/div/button[1]/span[1]")
    }

    get getDataGrid(){
        return $("//*[@id='root']//div[@class='MuiTableContainer-root']/table[@class='MuiTable-root']")
    }

    get allEntities(){
        //return $("//*[@id='root']//button[@class='MuiButtonBase-root MuiTab-root MuiTab-textColorInherit Mui-selected']/span[contains(text(),'All Entities')]")
        return $("//*[@id='root']/div/div/div[2]/div[2]/div[1]/div/div/div[2]/div/div/button[2]/span[1]")
    }

    entities(text){
        return $("//*[@id='tabpanel-0']/div/b[contains(text(),'"+text+"')]")
    }

    get searchEntityList(){
        return $("//*[@id='searchInput']")
    }

    setSearchEntityList(searchinput){
        elementutil.logInfo('Entering Search Entry List')
        elementutil.doSetValue(this.searchEntityList,searchinput)
    }

    selectEntityData(){
        elementutil.logInfo('Select Entity Data')
        elementutil.doclick(this.entityData)
    }

    selectAllEntities(){
        elementutil.logInfo('Selecting All Entities')
        elementutil.doclick(this.allEntities)
    }

    selectEntity(entity){
        // let tmpEntity = this.entities['selector'].replace('strText',entity)
        // console.log('After replacement ',tmpEntity)
        // this.entities['selector'] = tmpEntity
        // console.log('After adding ', this.entities)
        //console.log('After manipulation ',this.entities(entity))
        elementutil.logInfo('Selecting Entity')
        elementutil.doclick(this.entities(entity))
    }

    getDataMaintenancePageDescription(){
        //elementutil.doSwitchToFrame(this.appFrame)
        elementutil.logInfo('Getting Data Maintanance Page Description')
        return elementutil.doGetText(this.datamaintenance)
    }

    getinfo(col,row){
        let i,j,k
        let coli,rowj

        let parent = this.getDataGrid
        let colElements = parent.$$('<th>')
        let dataRows = parent.$$('<tr>')
        //Gathering Table Heads
        for(i = 0;i<colElements.length;i++){
            console.log(colElements[i].getText())
            if(col == colElements[i].getText() ){
                coli = i
                console.log("The head elements are ",colElements[i].getText())
                console.log("The coli is ",coli)
                break
            }
        }
        //******************************************************
        //Gathering Table Data
        for(j = 0;j<dataRows.length;j++){
            let dataCells = dataRows[j].$$('<td>')
            for(k = 0; k< dataCells.length; k++ ){
                if(k == coli && dataCells[k].getText() == row){
                    console.log("The matched table cell is ",dataCells[k].getText())
                    break
                }
            }

        }
        //******************************************************

    }
}

module.exports = new DataMaintenancePage();