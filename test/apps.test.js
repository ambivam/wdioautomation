const pageAppElements = require('../pages/luminateApps.page')
const pageHomeElements = require('../pages/luminatehome.page')
const dataMaintenance = require('../pages/datamaintenance.page')
const dataIngestion = require('../pages/ingestionstatus.page')
const loginpage = require('../pages/luminatePortalLogin.page')
const { assert } = require('chai')
const luminateconstants = require('../config/luminate.app.constants')
const ingestedAppData = require('../testdata/ingestionappdata')
const frameworkStrings = require('../config/framework.strings')
const elementutil = require('../util/elementutil')

const dataProvider = require('../testdata/dataprovider')
const temp = require('../testdata/temp.json')

describe('Validating Data Maintenance App',function(){

     it.skip('Logging and Validating Data Maintenance App', function(){
         elementutil.logInfo('Logging into LuminatePortal') 
         loginpage.loginLuminatePortal()
         elementutil.logInfo('Navigating to App Gallery') 
         elementutil.navigateTo(luminateconstants.AppPage)
         elementutil.logInfo('Launching Data Maintenance Application')
         elementutil.logInfo('Asserting App Page Description')
         assert.equal(pageAppElements.getAppPageDescription(),luminateconstants.MyApps)
         pageAppElements.launchApp(luminateconstants.DataMaintenanceApp)
         elementutil.logInfo("The page description is "+dataMaintenance.getDataMaintenancePageDescription())
         elementutil.logInfo('Asserting Data Maintenance Page')
         assert.equal(dataMaintenance.getDataMaintenancePageDescription(),luminateconstants.DataMaintenanceAppTitle)
     });

     it.skip('Testing Data Maintenance App', function(){
         elementutil.logInfo('Launching Data Maintenance App') 
         elementutil.launchDataMaintenance(luminateconstants.DataMaintenanceAppUrl)         
         dataMaintenance.setSearchEntityList(luminateconstants.DataMaintenanceLocation)
         dataMaintenance.selectEntityData()
         dataMaintenance.selectAllEntities()
         elementutil.logInfo('Validating Page Description of Data Maintenance Application')          
         assert.equal(dataMaintenance.getDataMaintenancePageDescription(),luminateconstants.DataMaintenanceAppTitle)
         //dataMaintenance.selectEntity('LOCATION')   
         //dataMaintenance.getinfo('Location Name','Australia')
    });

    it.skip('Logging and Testing Ingestion Status App', function(){
        elementutil.logInfo('Logging into LuminatePortal') 
        loginpage.loginLuminatePortal()
        elementutil.logInfo('Navigating to App Gallery') 
        elementutil.navigateTo(luminateconstants.AppPage)   
        elementutil.logInfo('Asserting App Page Description')   
        assert.equal(pageAppElements.getAppPageDescription(),luminateconstants.MyApps)
        elementutil.logInfo('Launching Ingestion Status Application')
        pageAppElements.launchApp(luminateconstants.IngestionStatusApp)
        elementutil.logInfo('Data Ingestion App Page Description')
        assert.equal(dataIngestion.getIngestionStatusPageDescription(),luminateconstants.IngestionStatusAppTitle)
        dataIngestion.setSearchIngestedData(ingestedAppData.IngestionData)
        dataIngestion.setSearchSource(ingestedAppData.SourceSearch)
    });

    it('DataProvider', function(){
      // console.debug(dataProvider.password)
      // console.log(dataProvider.scenario1[0].country)
      // console.log("The length s "+dataProvider.scenario1.length)
      temp
      console.debug(temp.scenario1.length)
      // console.log(dataProvider.scenario1[0].country)
      // console.log("The length s "+dataProvider.scenario1.length)


    });
  
    afterEach(function(){
        console.log('The current state of app is '+this.currentTest.state)
          if (this.currentTest.state != 'passed') {
             elementutil.captureScreenshot()
           }
         elementutil.doCloseBrowser()
       });

    });