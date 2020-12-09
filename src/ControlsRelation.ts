import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { CancelableEventArgs } from "@docsvision/webclient/System/CancelableEventArgs";
import { Layout } from "@docsvision/webclient/System/Layout";

import { StateButtons } from "@docsvision/webclient/BackOffice/StateButtons";
import { Numerator } from "@docsvision/webclient/BackOffice/Numerator";
import { State } from "@docsvision/webclient/BackOffice/State";
import { Component } from "react";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { UrlResolver } from "@docsvision/webclient/System/UrlResolver";
import { $RequestManager, IRequestManager } from "@docsvision/webclient/System/$RequestManager";
import { $UrlResolver } from "@docsvision/webclient/System/$UrlResolver";
import { MultipleEmployees } from "@docsvision/webclient/BackOffice/MultipleEmployees";

import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { onAppInitialized } from "@docsvision/webclient/App";
import { stat } from "fs";
import { LinkControl } from "@docsvision/webclient/Legacy/LinkControl";
import { Links } from "@docsvision/webclient/BackOffice/Links";

import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { ICancelableEventArgs } from "@docsvision/webclient/System/ICancelableEventArgs";
import { DirectoryDesignerRow } from "@docsvision/webclient/BackOffice/DirectoryDesignerRow";

import { TasksTree } from "@docsvision/webclient/BackOffice/TasksTree";
import { CardID } from "@docsvision/webclient/Platform/CardEditRouteTypeMapper";
import { render } from "react-dom";
import { ModalDialog } from "@docsvision/webclient/Helpers/ModalDialog/ModalDialog";
import { Employee } from "@docsvision/webclient/BackOffice/Employee";
import { $CurrentEmployeeId, $CurrentEmployeeAccountName } from "@docsvision/webclient/StandardServices";
import { Department } from "@docsvision/webclient/BackOffice/Department";
import { SavingButtons } from "@docsvision/webclient/Platform/SavingButtons";
import { Block } from "@docsvision/webclient/Platform/Block";
import { Folder } from "@docsvision/webclient/Platform/Folder";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { dateTimeToString } from "@docsvision/webclient/System/DateTimeUtils";
import { CheckBoxParams } from "@docsvision/webclient/Platform/CheckBox";
import { GroupTaskCardPerformersPanelParams } from "@docsvision/webclient/Legacy/GroupTaskCardPerformersPanelRazorControl";
import { CommentActionsPanelStyle } from "@docsvision/webclient/BackOffice/CommentActionsPanelStyle";
import { Table } from "@docsvision/webclient/Platform/Table";
import { arg } from "@docsvision/webclient/System/Decorators";
import { CardManagementParams, CardManagement } from "@docsvision/webclient/Platform/CardManagement";
import { BaseControl } from "@docsvision/webclient/System/BaseControl";
import { RequestOptions } from "@docsvision/webclient/Legacy/Utils";
import { $CardTimestamp } from "@docsvision/webclient/System/LayoutServices";
const MATCHING_IN_PARALLEL = 'BAF2C07E-0481-46CD-AF3D-FA94DC6F0A37'
const LAYOUT_MODE_INCOMING_DOCUMENT = 'c4c5e860-191b-47b3-a865-6ccc1fac636a'

var cancelChangeState = true;


export async function changeStateParams(sender:Layout) {
    cancelChangeState = true;
}

export async function addFirstNumberToOutgoingDocument(layout:Layout) {
    let control = layout.controls;
    let numerator = control.get<Numerator>('regNumber');

    console.log(typeof(numerator.value.number))

    if(numerator.value.number == null){
        await numerator.generateNewNumber();

    } else {
        console.log('net123')
    }

}



export async function addFirstNumberToServiceNote(layout:Layout) {
    let control = layout.controls;
    let numerator = control.get<Numerator>('regNumber');
    console.log(typeof(numerator.value.number))

    if(numerator.value.number == null){
        numerator.generateNewNumber();
    } else {
        console.log('net123')
    }
}



export async function addSecondNumberToServiceNote(sender:Layout, args: CancelableEventArgs<any>) {
    let numberOfDocument: Numerator = sender.layout.controls.regNumber
    let stateOfDocument: State = sender.layout.controls.state
    console.log(stateOfDocument.params.value.stateId);

    console.log(args.data.operationId=='de975e5e-b5e0-4a2f-9ed4-7ac7dc605031')
    if (stateOfDocument.params.value.stateId == "73bf8120-94d4-4704-8953-3b2f5abcc05f" && cancelChangeState && numberOfDocument.params.value.number != 'null' && args.data.operationId == "de975e5e-b5e0-4a2f-9ed4-7ac7dc605031"){
        cancelChangeState = false;
        args.cancel();
        await numberOfDocument.generateNewNumber();
        await sender.changeState("de975e5e-b5e0-4a2f-9ed4-7ac7dc605031");
    } else {

    }
}


export async function addDateOfRegistrationToServiceNote(sender:Layout) {
    let registrationDate: DateTimePicker = sender.layout.controls.registrationDateTime
    let stateOfDocument: State = sender.layout.controls.state



    let checkFirstOpen = sender.layout.controls.checkBox1
    console.log(stateOfDocument)



    if (stateOfDocument.params.value.stateId == "6201006d-e11a-4f1e-afab-c3799526d9ae" && checkFirstOpen.value == false){


        var now = new Date();
        registrationDate.params.visibility = true;
        registrationDate.value = now
        checkFirstOpen.value = true

        layoutManager.cardLayout.save()
        console.log('if')




    } else if (stateOfDocument.params.value.stateId == "6201006d-e11a-4f1e-afab-c3799526d9ae" && checkFirstOpen.value == true)
    {
        registrationDate.params.visibility = true;
        console.log('else if')
    }
    else {
        registrationDate.params.visibility = false;
    }




}

export async function addRegistrationNumberToProtocol(sender:Layout) {



    let registrationDate: DateTimePicker = sender.layout.controls.registrationDate
    let stateOfDocument: State = sender.layout.controls.state



    let checkFirstOpen = sender.layout.controls.checkBox1
    console.log(stateOfDocument)



    if (stateOfDocument.params.value.stateId == "47c85348-a58d-4932-a075-e7a050528de5" && checkFirstOpen.value == false){


        var now = new Date();
        registrationDate.params.visibility = true;
        registrationDate.value = now
        checkFirstOpen.value = true

        layoutManager.cardLayout.save()
        console.log('if')




    } else if (stateOfDocument.params.value.stateId == "47c85348-a58d-4932-a075-e7a050528de5" && checkFirstOpen.value == true)
    {
        registrationDate.params.visibility = true;
        console.log('else if')
    }
    else {
        registrationDate.params.visibility = false;
    }



}








export async function addDateOfRegistration(sender:Layout) {

    let registrationDate: DateTimePicker = sender.layout.controls.registrationDateTime
    let stateOfDocument: State = sender.layout.controls.state



    let checkFirstOpen = sender.layout.controls.checkBox1
    console.log(checkFirstOpen)

    if (stateOfDocument.params.value.stateId == "11af3bf8-b1dd-47ed-a50d-b7da7390bac7" && checkFirstOpen.value == false){


        var now = new Date();
        registrationDate.params.visibility = true;
        registrationDate.value = now
        checkFirstOpen.value = true

        layoutManager.cardLayout.save()





    } else if (stateOfDocument.params.value.stateId == "11af3bf8-b1dd-47ed-a50d-b7da7390bac7" && checkFirstOpen.value == true)
    {
        registrationDate.params.visibility = true;
        console.log('else if')
    }
    else {
        registrationDate.params.visibility = false;
    }

}







export async function addSecondNumberToDocumentOutgoing(sender:Layout,args: CancelableEventArgs<any>) {


    let numberOfDocument: Numerator = sender.layout.controls.regNumber
    let stateOfDocument: State = sender.layout.controls.state





    if (stateOfDocument.params.value.stateId == "f31a67a8-d79c-48ec-87dd-0d6a5a03356f" && cancelChangeState && numberOfDocument.params.value.number != 'null' && args.data.operationId == "68c039da-d2e4-4c01-975a-eed6ca0b17a7"){
        cancelChangeState = false;

        args.cancel();


        await numberOfDocument.generateNewNumber();

        await sender.changeState("68c039da-d2e4-4c01-975a-eed6ca0b17a7");








    } else {

    }
}






export async function addSecondNumberToAgreementAdditional(sender:Layout, args: CancelableEventArgs<any>) {
    let numberOfDocument: Numerator = sender.layout.controls.regNumber
    let stateOfDocument: State = sender.layout.controls.state
    console.log(stateOfDocument.params.value.stateId);


    if (stateOfDocument.params.value.stateId == "fbe40b3d-4592-4d50-805c-6e6bf86ab857" && cancelChangeState && numberOfDocument.params.value.number != 'null' && args.data.operationId == "4a204c43-aa99-44be-87a2-bb84f1ae58cf"){
        cancelChangeState = false;
        args.cancel();
        await numberOfDocument.generateNewNumber();
        await sender.changeState("4a204c43-aa99-44be-87a2-bb84f1ae58cf");
    } else {

    }
}


export async function clickToAgreementButton(sender:Layout, args: CancelableEventArgs<any>) {

    let dateSigningdate: DateTimePicker = sender.layout.controls.partnerSigningDate
    let datePartnerReconciliationDate:DateTimePicker = sender.layout.controls.partnerReconciliationDate
    if(dateSigningdate.params.value == null){
        dateSigningdate.params.value = new Date();
        datePartnerReconciliationDate.value = new Date();
        layoutManager.cardLayout.save();
    }else {

    }




}


export async function addSecondNumberToAgreement(sender:Layout, args: CancelableEventArgs<any>) {
    let numberOfDocument: Numerator = sender.layout.controls.regNumber
    let stateOfDocument: State = sender.layout.controls.state

    console.log(stateOfDocument)

    if (stateOfDocument.params.value.stateId == "bd60a90c-9ced-47f8-be4b-36198086fdc5" && cancelChangeState && numberOfDocument.params.value.number != 'null' && args.data.operationId == "42b09de2-ffe4-4f4a-87dd-2cca1fac4a66"){
        cancelChangeState = false;
        args.cancel();
        await numberOfDocument.generateNewNumber();
        await sender.changeState("42b09de2-ffe4-4f4a-87dd-2cca1fac4a66");
    } else {

    }
}




export async function addNumberToProtocol(sender:Layout, args: CancelableEventArgs<any>) {
    let numberOfDocument: Numerator = sender.layout.controls.regNumber
    let stateOfDocument: State = sender.layout.controls.state
    console.log(stateOfDocument.params.value.stateId);


    if (stateOfDocument.params.value.stateId == "14713b51-99da-40dd-8b6a-3d86f97ec6f8" && cancelChangeState && numberOfDocument.params.value.number != 'null' && args.data.operationId == "3665a225-631c-4e5b-85ba-3df4cc1a99d6"){
        cancelChangeState = false;
        args.cancel();
        await numberOfDocument.generateNewNumber();
        await sender.changeState("3665a225-631c-4e5b-85ba-3df4cc1a99d6");
    } else {

    }
}

export async function testGenerate(sender:Layout, args: CancelableEventArgs<any>) {
    let numberOfDocument: Numerator = sender.layout.controls.regNumber
    let stateOfDocument: State = sender.layout.controls.state
    console.log(stateOfDocument.params.value.stateId);


    if (stateOfDocument.params.value.stateId == "3e975349-ccaf-44f7-8927-e67c142f1fc6" && cancelChangeState && numberOfDocument.params.value.number != 'null' && args.data.operationId == "68c039da-d2e4-4c01-975a-eed6ca0b17a7"){
        cancelChangeState = false;
        args.cancel();
        await numberOfDocument.generateNewNumber();
        await sender.changeState("68c039da-d2e4-4c01-975a-eed6ca0b17a7");
    } else {

    }

}




export async function genereateNewNumberForContract(sender){
    let controls = sender.layout.controls
    let regNumber = controls.regNumber
    if(regNumber.params.value.number == null){
        await  regNumber.generateNewNumber();

        layoutManager.cardLayout.save();
    } else {
        console.log('net123')
    }
}

export async function addFirstNumberToAgreement(layout:Layout) {
    let control = layout.controls;
    let numerator = control.get<Numerator>('regNumber');


    if(numerator.params.value.number == null){
        await  numerator.generateNewNumber();

        layoutManager.cardLayout.save();
    } else {
        console.log('net123')
    }
}

export async function addFirstNumberToORDDocument(layout:Layout) {
    let control = layout.controls;
    let numerator = control.get<Numerator>('regNumber');
    console.log(typeof(numerator.value.number))

    if(numerator.value.number == null){
        numerator.generateNewNumber();
    } else {
        console.log('net123')
    }

}



export async function addNumberToDORDDocument(sender:Layout, args: CancelableEventArgs<any>) {
    let numberOfDocument: Numerator = sender.layout.controls.regNumber
    let stateOfDocument: State = sender.layout.controls.state
    console.log(stateOfDocument.params.value.stateId);
    if (stateOfDocument.params.value.stateId == "33761be7-8782-4f7a-a49d-eaa6e1d3ca05" && cancelChangeState && numberOfDocument.params.value.number != 'null' && args.data.operationId == "d74b4f52-dc2c-4892-95c3-0bd4a1c39734"){
        cancelChangeState = false;
        args.cancel();
        await numberOfDocument.generateNewNumber();
        await sender.changeState("d74b4f52-dc2c-4892-95c3-0bd4a1c39734");
    } else {
        console.log('789')
    }


}







export async function close(sender:Layout, args: CancelableEventArgs<any>) {

    layoutManager.deleteCard();


}



export async function addNewNumberToNormativeDocument(sender: Layout, args: CancelableEventArgs<any>) {
    let numerator: Numerator = sender.layout.controls.regNumber
    let stateOfDocument: State = sender.layout.controls.state


    if (args.data.operationId == "efd685f5-3a76-4ed9-9cdf-692975f639a5" && cancelChangeState) {
        cancelChangeState = false;
        args.cancel();
        await numerator.generateNewNumber();
        await sender.changeState("efd685f5-3a76-4ed9-9cdf-692975f639a5");
    }




}



export async function addNewNumberToDocument(sender: Layout, args: CancelableEventArgs<any>) {
    let numerator: Numerator = sender.layout.controls.regNumber
    let stateOfDocument: State = sender.layout.controls.state


    if (args.data.operationId == "35ee6adf-87ac-44e8-97fd-7a36237f4352" && cancelChangeState) {
        cancelChangeState = false;
        args.cancel();
        await numerator.generateNewNumber();
        await sender.changeState("35ee6adf-87ac-44e8-97fd-7a36237f4352");
    }




}


export async function getEmployeeGroupId(urlResolver: UrlResolver, requestManager: IRequestManager) {
    let url = urlResolver.resolveApiUrl("getGroupEmployees","groupStaff");
    url+= "?id=" + MATCHING_IN_PARALLEL;
    return requestManager.get(url);
}



export async function getEmployeeFullName(urlResolver: UrlResolver, requestManager: IRequestManager, employeeId: string): JQueryDeferred<GenModels.EmployeeDataModel> {
    let url = urlResolver.resolveApiUrl("GetEmployeeFullName", "FullName");
    url += "?employeeId=" + employeeId;
    return requestManager.get<GenModels.EmployeeDataModel>(url);
}

export async function getFullNameOfEmployee(layout: Layout){

    let urlResolver = layout.getService($UrlResolver);
    let requestManager = layout.getService($RequestManager);
    let id = await getEmployeeGroupId(urlResolver, requestManager);
    let control = layout.controls;
    for (var i=0; i<id['length']; i++){
        let requestEmployee = await getEmployeeFullName(urlResolver, requestManager, id[i]);
        let approversList = control.get<MultipleEmployees>('multipleEmployees1')
        console.log(requestEmployee);
        approversList.params.value.push(requestEmployee);
        approversList.forceUpdate();
    }

}

export async function addEmployeesName(sender:Layout){

    let name = await getFullNameOfEmployee(sender);

}


export async function addNewTaskaIncomingTask(layout: Layout, e: IEventArgs){

    let control = layout.controls;


    console.log('1')
    console.log(window.location.pathname)
}

export async function createNewNumber(layout:Layout){

    let control = layout.controls;
    let numerator = control.get<Numerator>('regNumber');
    console.log(typeof(numerator.value.number))

    if(numerator.value.number == null){
        numerator.generateNewNumber();
    } else {
        console.log('net123')
    }





}


export async function checkLink(layout: Layout){
    let control = layout.controls;
    let link = control.get<Links>('links')
    var masLink = [];
    if(link.params.links.length > 0){
        let firstMasLink = link.params.links[0].data['cardId'];
        masLink.push('?ids='+firstMasLink)
        for(let i=1; i<link.params.links.length; i++){
            masLink.push('&ids=' + link.params.links[i].data['cardId'])
        }
        console.log(masLink)
        return masLink
    }else {
        let masLinksTrue = false;
        return masLinksTrue
    }

}

export async function checkState(sender: Layout, args: ICancelableEventArgs<any>){
    args.wait();
    args.cancel();
    let urlResolver = sender.layout.getService($UrlResolver);
    let requestManager = sender.layout.getService($RequestManager);
    let getLinks = await checkLink(sender.layout)
    if(getLinks == false){
        let message = 'Невозможно отправить на согласование'
        await errorModalDialog(sender, message);
    } else {
        let isLinksRegisteredOutgoingDocument = await checkLinksOnRegistered(urlResolver, requestManager, getLinks);
        if(isLinksRegisteredOutgoingDocument){
            args.accept();
        }else {

            let message = 'Невозможно отправить на согласование'
            await errorModalDialog(sender, message);



        }
    }




}

export async function checkLinksOnRegistered(urlResolver: UrlResolver, requestManager: IRequestManager, masLinks: Object): JQueryDeferred<Boolean>{
    let url = urlResolver.resolveApiUrl("hasRegisteredIncomingDocument", "links");
    url += masLinks;
    return requestManager.get<Boolean>(url);
}

export async function cancelAgreement(sender:Layout, e: CancelableEventArgs<any>){
    console.log('yes');
    let boolCheckLinks = await checkState(sender, e);

}

export async function errorModalDialog(sender:Layout, mesagge){
    MessageBox.ShowError(mesagge)
        .done(() => {

        })
}

export async function sucessModalDialog(sender:Layout, mesagge, title?:string){
    MessageBox.ShowConfirmation(mesagge, title)
        .done(() => {
            console.log('Печатаем')
        })
        .fail(()=>{
            console.log('не печатаем')
        })
}


export async function agreementStart(urlResolver: UrlResolver, requestManager: IRequestManager, idDocument){
    let url = urlResolver.resolveApiUrl("getAgreementManagementStartModel","layoutAgreement")
    url += "?documentCardId=" + idDocument
    return requestManager.get(url)
}







export async function getTrueNameToORD( sender: Layout){
    let typeOfordDocument: DirectoryDesignerRow = sender.layout.controls.ordKind;
    let theme:TextBox = sender.layout.controls.documentName


    let val = theme.params.value.toLowerCase();
    theme.params.value = null;

    theme.params.value = typeOfordDocument.params.value.name.toString();
    theme.params.value += ' ';
    theme.params.value += val;


}


















// export async function getTaskTree(urlResolver: UrlResolver, requestManager: IRequestManager, id: string){
//     let url = urlResolver.resolveApiUrl("getFullTaskTree", "getFullTaskList");
//     url += ''
//     return requestManager.get(url)
// }

export async function getCardId(sender: Layout){
    let urlResolver = sender.layout.getService($UrlResolver);
    let requestManager = sender.layout.getService($RequestManager);
    let idDocument = layoutManager.cardLayout['contextImpl']['services'].cardId;
    let layoutDocument = await getLayoutOfDocument(urlResolver, requestManager, idDocument, LAYOUT_MODE_INCOMING_DOCUMENT);




    var tasktree = await getFullTaskTree(urlResolver, requestManager, idDocument);
    console.log(tasktree['nodes'][0].hasDelegates)
    var string ='';
    for(let i=0; i<tasktree['nodes'].length-1; i++){
        string += '<p>fjhf</p>'
        string +='Документ :'
        string += tasktree['nodes'][i]['hint'].name;
        string +='Состояние :'
        string += tasktree['nodes'][i]['hint'].stateDisplayName;

        string +='Исполнитель :'
        string += tasktree['nodes'][i]['currentPerformers'][0]['displayName'];
        string +='До :'
        string += tasktree['nodes'][i]['hint'].endDate;
        string +='Делегировано :'
        if(tasktree['nodes'][i].hasDelegates == true){
            string +='Да'
            string +='Делегировано от:'
            string += tasktree['nodes'][i]['hint'].delegationHint.fromPerformer;
            string +='Делегировано для:'
            string += tasktree['nodes'][i]['hint'].delegationHint.toPerformer;

        }else {
            string += 'Нет'
        }



    }






    await sucessModalDialog(sender, string, "Напечатать задания?")

}


export async function getLayoutOfDocument(urlResolver: UrlResolver, requestManager: IRequestManager, idDocument: string, layoutMode: string ){
    let url = urlResolver.resolveApiUrl("view", "layoutCard");
    url+= "?cardId=" + idDocument
    url += '&layoutMode=' + layoutMode
    return requestManager.get(url);
}


export async function getFullTaskTree(urlResolver: UrlResolver, requestManager: IRequestManager, idDocument: string){
    let url = urlResolver.resolveApiUrl("Get", "TasksTree");
    let postdata = {
        cardId: idDocument,
        fullTree: true,
        kindIds: [
            'ab801854-70af-4b6c-ab48-1b59b5d11aa9',
            "e3f68b8d-24b8-468d-9fd0-ab4d387948f8",
            "6d76d0a7-5434-40f2-912e-6370d33c3151"
        ],

    }
    return requestManager.post(url, JSON.stringify(postdata))
}























export async function getEmployeeDepartment(urlResolver: UrlResolver, requestManager: IRequestManager, employeeId: string): JQueryDeferred<GenModels.DepartmentModel> {
    let url = urlResolver.resolveApiUrl("GetEmployeeDepartment", "DemoDocument");
    url += "?employeeId=" + employeeId;
    return requestManager.get<GenModels.DepartmentModel>(url);
}



export function outgoingDocument_onCardLoaded(sender: Layout) {
    outgoingDocumentRefreshDepartment(sender);
}



export async function outgoingDocumentRefreshDepartment(layout: Layout) {
    let urlResolver = layout.getService($UrlResolver);
    let requestManager = layout.getService($RequestManager);
    let controls = layout.controls;
    let registrarControl = controls.get<Employee>("registrar");
    let registrarDepartmentControl = controls.get<Department>("staffDepartment");
    if (registrarControl && registrarDepartmentControl) {
        let employeeId = registrarControl.params.value.id;
        let department = await getEmployeeDepartment(urlResolver, requestManager, employeeId);
        registrarDepartmentControl.params.value = department;

    }
}






export async function addTrueFolderToDocument(sender:Layout, Foldername, idFolder) {


    let folder = sender.layout.controls.get<Folder>('folderSelect')
    let idDocument = layoutManager.cardLayout['contextImpl']['services'].cardId;

    let folderPayment = {
        name: Foldername,
        type: 1,
        id: idFolder,
        targetFolderId: "00000000-0000-0000-0000-000000000000",
        hasUnloadedSubfolders: false,
        additionalId: '',
        defaultStyle: 1,
        url: '{'+idFolder+'}&ShowPanels=2050&',
        defaultViewId: '',
        searchId: '',
        refreshTimeout: 0.1,
        showUnreadCounter: false,
        pagedSecurity: false,
        folders: [],



    }
    folder.params.value = folderPayment

}

export async function addFolderToIncoming(sender:Layout) {
    let ID_ORD_Folder = 'BB3632EA-BB5F-46B1-9806-950B70F59BB3'
    let NAME_INCOMING_DOCUMENT = '01. Входящие'
    await addTrueFolderToDocument(sender, NAME_INCOMING_DOCUMENT, ID_ORD_Folder)
}


export async function addFolderToContract(sender:Layout) {

    let ID_Contract_Folder = '3BFC90E6-A7A0-4362-83DB-6A841301020B'
    let NAME_CONTRACT_DOCUMENT = '07. Договоры/дополнительные соглашения'
    await addTrueFolderToDocument(sender, NAME_CONTRACT_DOCUMENT, ID_Contract_Folder)
}

export async function addFolderToOutgoing(sender:Layout) {

    let ID_Outgoing_Folder = 'D74012CC-0D41-4631-B594-26EBD9C4495C'
    let NAME_OUTGOING_DOCUMENT = '02. Исходящие'
    await addTrueFolderToDocument(sender, NAME_OUTGOING_DOCUMENT, ID_Outgoing_Folder)
}


export async function addFolderToORD(sender:Layout) {

    let ID_ORD_Folder = 'D740DCF2-A660-49E0-B5A1-9C5177185531'
    let NAME_ORD_DOCUMENT = '03. Организационно-распорядительные'
    await addTrueFolderToDocument(sender, NAME_ORD_DOCUMENT, ID_ORD_Folder)

}

export async function addFolderNormative(sender:Layout) {

    let ID_NORMATIVE_DOCUMENT = '2AC74C8A-0A78-48E5-BC52-BB5037558E62'
    let NAME_NORMATIVE_DOCUMENT = '06. Нормативные документы'
    await addTrueFolderToDocument(sender, NAME_NORMATIVE_DOCUMENT, ID_NORMATIVE_DOCUMENT)
}

export async function addFolderProtocol(sender:Layout) {

    let ID_PROTOCOL_DOCUMENT = 'A499618B-8455-4896-86D7-F344DAB6196D'
    let NAME_PROTOCOL_DOCUMENT = '05. Протоколы совещаний'
    await addTrueFolderToDocument(sender, NAME_PROTOCOL_DOCUMENT, ID_PROTOCOL_DOCUMENT)
}


export async function addFolderMemo(sender:Layout) {

    let ID_MEMO_DOCUMENT = 'F1C58147-8EC1-4436-998D-EAEAD133632C'
    let NAME_MEMO_DOCUMENT = '04. Служебные записки'
    await addTrueFolderToDocument(sender, NAME_MEMO_DOCUMENT, ID_MEMO_DOCUMENT)
}


export async function addFolderToSupplementaryAgreement(sender:Layout) {
    let ID_SUUPLEMENTARY_AGREEMENT = ''
}

export async function generateNumberToContract(sender: Layout, args: CancelableEventArgs<any>) {
    let numerator: Numerator = sender.layout.controls.regNumber
    console.log('123')
    args.wait();
    await numerator.generateNewNumber();
    args.accept()

}


export async function cleaerControlDate(sender:Layout){
    let date:DateTimePicker = sender.layout.controls.endDate_timeOfPerformance
    date.params.value = undefined

}

export async function compareDate(sender:Layout, args: CancelableEventArgs<any>) {
    let date:DateTimePicker = sender.layout.controls.endDate_timeOfPerformance
    let now = new Date();
    if(date.params.value <= now){

        alert('Срок исполнения не может быть менее текущей даты!')
        date.params.value = undefined;
    }else {

    }

}


export async function compareDateOfGroupTask(sender:Layout, args: CancelableEventArgs<any>) {

    let date = sender.layout.controls.endDate_periodOfExecution;
    let  now = new Date();
    if (date.params.value < now) {
        alert('Срок исполнения не может быть менее текущей даты!');
        date.params.value = undefined;
    }else {

    }


}



export async function compareDateOfTask(sender:Layout, args: CancelableEventArgs<any>) {



    let date = sender.layout.controls.endDate_timeOfPerformance;
    let now = new Date();
    if (date.params.value < now) {
        alert('Срок исполнения не может быть менее текущей даты!');
        date.params.value = undefined;
    } else {

    }

}


export async function testNumerator(sender:Layout, args: CancelableEventArgs<any>) {


    let numerator: Numerator = sender.layout.controls.regNumber


    if(numerator.value.number == null){
        numerator.generateNewNumber();
    } else {
        console.log('net123')
    }

}



export async function testAddTime(sender:Layout, args: CancelableEventArgs<any>){
    let time: GroupTaskCardPerformersPanelParams = sender.layout.controls.groupTaskCardPerformersPanel
    $('.ui-sortable tr').each(function(){
        var name = $(this).data('performer-name')
        console.log(name)
    })



}


export async function stopSendGroupTaskAndAddTrueTime(sender:Layout, args:ICancelableEventArgs<any>){
    args.wait();
    console.log('123');
    args.cancel();

}


export async function getTimeLagFromEmplolyee(urlResolver: UrlResolver, requestManager: IRequestManager, id: string) {
    let url = urlResolver.resolveApiUrl("getTimeLag", "TimeLag");
    url += "?id=" + id;
    return requestManager.get(url);
}





export async function isNumberProject(sender:Layout, args:ICancelableEventArgs<any>){

    let numberOfDocument: Numerator = sender.layout.controls.regNumber
    let stateOfDocument: State = sender.layout.controls.state
    console.log(stateOfDocument.params.value.stateId);
    console.log(numberOfDocument)
    let number = numberOfDocument.value.number
    let project = number.toString().split('-')[1]
    console.log(project)


    if (
        stateOfDocument.params.value.stateId == "3e975349-ccaf-44f7-8927-e67c142f1fc6"
        && cancelChangeState
        && numberOfDocument.params.value.number != 'null'
        && args.data.operationId == "68c039da-d2e4-4c01-975a-eed6ca0b17a7"
        && project == 'Проект'
    )
    {
        cancelChangeState = false;
        args.cancel();
        await numberOfDocument.generateNewNumber();
        await sender.changeState("68c039da-d2e4-4c01-975a-eed6ca0b17a7");

    } else {
        console.log('noproject')
    }
}




export async function checkTable(sender:Layout, args:ICancelableEventArgs<any>){
    args.wait();
    let table: Table = sender.layout.controls.table1
    let lengthRows:Number = table.params.rows.length
    console.log(lengthRows)
    if (lengthRows == 0){
        args.cancel();
        MessageBox.ShowError('Введите контрагента')
    } else {
        console.log('123')
        args.accept();
    }

}


export async function changeStateToApproved(sender){
    await layoutManager.cardLayout.changeState("bae31930-32a2-4f26-a501-e7029846d56e");
    let urlResolver = sender.layout.getService($UrlResolver);
    let requestManager = sender.layout.getService($RequestManager);
    let cardId = sender.layout.cardInfo.id;
    let cardManagement:CardManagement = sender.layout.controls.cardManagement;
    await CreateFileStamp(urlResolver, requestManager, cardId)
    cardManagement.refresh()
}


export async function CreateFileStamp(urlResolver: UrlResolver, requestManager: IRequestManager, CardID: string) {
    let url = urlResolver.resolveApiUrl("CreateFileStamp", "FileStamp");
    url += "?CardID=" + CardID;
    return requestManager.get(url);
}

export async function taskPositiveFinishing(sender, e){
    let el = document.getElementsByClassName('decision')
    let append = document.getElementById('decision-control-container')
    console.log(el)
    for(let i=0; i<4; i++){
        console.log('123')
         let elClone = el[i].cloneNode(true)
        el[i].classList.add('hide')

        elClone.addEventListener('click', async function (event){
            let decisionName = this.dataset.decisionName
            let decisionOperation = this.dataset.operation
            console.log(decisionName)
            if(decisionName == 'Утверждено'){

                let urlResolver = sender.layout.getService($UrlResolver);
                let requestManager = sender.layout.getService($RequestManager);
                let approvalDocLink = sender.layout.controls.approvalDocLink
                let cardId = approvalDocLink.params.links[0].data.cardId
                await CreateFileStamp(urlResolver, requestManager, cardId)

                let decisionSemantics = this.dataset.decisionSemantics
                console.log(this.dataset)
            let agreement = el[0]
                $('.decision')[0].click()
            } else if(decisionName == 'Согласовано'){



                $('.decision')[0].click()
            } else if(decisionName == 'Отказано'){


                $('.decision')[1].click()
            }else if(decisionOperation == 'TakeInWork'){
                $('.decision')[3].click()
            }else if(decisionOperation == 'Delegate'){
                $('.decision')[2].click()
            }else if(decisionOperation == 'CancelDelegation'){
                $('.decision')[3].click()
            }
        })
        append.appendChild(elClone)
        // document.body.appendChild(elClone);
    }


}

//0a887f8a-521c-4ef1-8912-8ef025eb6afe



// taskId: 3de566e5-e1ac-4e48-b9df-92686e8c76f6
// decisionId: 0d9b3434-82e5-4363-b851-feae7b32c994
// timestamp: 2034321503
// decisionSemantics: 1
var oneClickFlag = true
export async function turnTruePeremenDoubleClick(sender){
     oneClickFlag = true
}

export async function oneClickButton(Sender){
    if(!oneClickFlag){
       return
    }
}

export async function afterChangeState(sender){
    console.log('changeState')
    let state:State = sender.layout.controls.state
    console.log(state.params.value.stateId)
    let taskName = sender.layout.controls.taskName
    if(state.params.value.stateId == "b5ac2214-5abc-40a9-9dd5-b1bc5432ba3a" && taskName.params.value == 'Утверждение реестра актов'){
        let urlResolver = sender.layout.getService($UrlResolver);
        let requestManager = sender.layout.getService($RequestManager);
        let approvalDocLink = sender.layout.controls.approvalDocLink
        let cardId = approvalDocLink.params.links[0].data.cardId
        await CreateFileStamp(urlResolver, requestManager, cardId)
    }
}
