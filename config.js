let config = {
    'authHistory': undefined,
    'authSession': undefined,
    'authHistoryView': undefined,
    'authSessionView': undefined,
    'participants': undefined,
    'participantsView': undefined,
    'participantsForm': undefined,
    'participantsFormView': undefined,
}

function authHistoryAPI() {
    fetch('../mock-data/Config.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let dataSource = data.dataSources;
            let view = data.views;
            config.authHistory = { ...dataSource.filter((item) => item.id == 'authHistory')[0]
            };
            config.authHistoryView = { ...view.filter((item) => item.id == 'authHistory')[0]
            };
            let authHContent = document.querySelector("#authHistory-content");
            let displayList = getTableContent(config.authHistory.mockDataSet,config.authHistoryView.columns,'authHistory');
            let displayHeader = getTableHeader(config.authHistoryView.columns,'authHistory');

            let table = document.createElement('table');
            table.setAttribute('class','table table-bordered');
            let tHead = document.createElement('thead');
            tHead.append(displayHeader);
            table.append(tHead);
            table.append(displayList);
        
            if (authHContent) {
                authHContent.innerHTML = '<span style="display:none;"></span>';
                authHContent.append(table);
            }

        });
}

function authSessionAPI() {
    fetch('../mock-data/Config.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let dataSource = data.dataSources;
            let view = data.views;
            config.authSession = { ...dataSource.filter((item) => item.id == 'authSession')[0]
            };
            config.authSessionView = { ...view.filter((item) => item.id == 'authSession')[0]
            };
            let authSContent = document.querySelector("#authSession-content");
            let displayList = getTableContent(config.authSession.mockDataSet,config.authSessionView.columns,'authSession');
            let displayHeader = getTableHeader(config.authSessionView.columns,'authSession');

            let table = document.createElement('table');
            table.setAttribute('class','table table-bordered');
            let tHead = document.createElement('thead');
            tHead.append(displayHeader);
            table.append(tHead);
            table.append(displayList);
        
            if (authSContent) {
                authSContent.innerHTML = '<span style="display:none;"></span>';
                authSContent.append(table);
            }
        });
}

function participantsAPI() {
    fetch('../mock-data/Participants.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let dataSource = data.dataSources;
        let view = data.views;
        config.participants = { ...dataSource.filter((item) => item.id == 'participants')[0]
        };
        config.participantsView = { ...view.filter((item) => item.id == 'participants')[0]
        };

        let participantsContent = document.querySelector("#participants-content");
        let displayHeader = getTableHeader(config.participantsView.columns,'participants');

        let displayList = getTableContent(config.participants.mockDataSet,config.participantsView.columns,'participants');

        let table = document.createElement('table');
        table.setAttribute('class','table table-bordered');

        let tHead = document.createElement('thead');
        
        tHead.append(displayHeader);
        table.append(tHead);
        table.append(displayList);

        let createBtn = document.createElement('button');
        createBtn.setAttribute('type','button');
        createBtn.innerHTML = 'CREATE A RECORD';
        createBtn.addEventListener('click',createHandler);

        function createHandler() {
            var newObject = getEmptyObject();
            config.participants.mockDataSet.push(newObject);
            appendEmptyRow(table.querySelectorAll('tbody')[0],config.participantsView.columns);
        }

        let submitBtn = document.createElement('button');
        submitBtn.setAttribute('type','button');
        submitBtn.innerHTML = 'SUBMIT';
        submitBtn.addEventListener('click',submitHandler);
        
        function submitHandler() {
            let editedRow = displayList.querySelectorAll('tr[data-editable=true')[0];
            let index = editedRow.getAttribute('data-index');
            let columns = config.participantsView.columns;
            columns.map((column, columnIndex) => {
                submitUpdatedData(config.participants.mockDataSet[index][column.id],column,editedRow,index);
            });
            let updatedData = getRowFields(config.participants.mockDataSet[index],index,columns,'participants');
            editedRow.innerHTML = updatedData.innerHTML;
            editedRow.removeAttribute('data-editable');
            editedRow.removeAttribute('data-index');
        }
        
        if (participantsContent) {
            participantsContent.innerHTML = '';
            participantsContent.append(table);
            participantsContent.append(createBtn);
            participantsContent.append(submitBtn);
        }

    });
}

function participantsFormAPI() {
    fetch('../mock-data/Participants_form.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let dataSource = data.dataSources;
            let view = data.views;
            config.participantsForm = { ...dataSource.filter((item) => item.id == 'participants')[0]
            };
            config.participantsFormView = { ...view.filter((item) => item.id == 'formParticipants')[0]
            };

            let participantsFormContent = document.querySelector("#participantsForm-content");

           
            if (participantsFormContent) {
                participantsFormContent.innerHTML = '';
                normalFormPage(participantsFormContent);
            }

        });
}

function appendEmptyRow(container,columns) {
    let row = document.createElement('tr');
    getRowFormFields(config.participants.mockDataSet[config.participants.mockDataSet.length-1],columns,row,config.participants.mockDataSet.length-1);
    container.append(row);
}

function getEmptyObject() {
    var emptyObj = {
        "issuerParty": "",
        "taxId": "",
        "editable": false,
        "employment": {
          "employeeNumber": "",
          "hireDate": "",
          "terminationDate": ""
        },
        "fullName": {
          "given": "",
          "middle": "",
          "family": ""
        },
        "addresses": [{
            "context": "home",
            "lineOne": "",
            "lineTwo": "",
            "city": "",
            "countrySubdivision": "",
            "postalCode": "",
            "countryCode": ""
          },
          {
            "context": "work",
            "lineOne": "",
            "lineTwo": "",
            "city": "",
            "countrySubdivision": "",
            "postalCode": "",
            "countryCode": ""
          }
        ],
        "phoneNumbers": [{
            "context": "home",
            "digits": ""
          },
          {
            "context": "work",
            "digits": ""
          }
        ],
        "emailAddresses": [{
          "context": "home",
          "address": ""
        }],
        "id": "",
        "promoted": false,
        "birthDate": "",
        "uuid": ""
      }
    return emptyObj;
}

function getTableHeader(columns,type) {
    let tHeadRow = document.createElement('tr');
    if(type === 'participants') {
        let tableActionHead = document.createElement('th');
        tableActionHead.innerHTML = '';
        tHeadRow.append(tableActionHead);
    }
    columns.map((column,columnIndex) => {
        let tableHead = document.createElement('th')
        tableHead.innerHTML = column.label;
        tHeadRow.append(tableHead);
    });
    return tHeadRow;
}

function getTableContent(dataset,columns,type) {
    let tBody = document.createElement('tbody');

    dataset.map((record, recordIndex) => {
        let displayRows = getRowFields(record,recordIndex,columns,type);
        tBody.append(displayRows);
    });
    return tBody;
}

function getRowFields(record,index,columns,type) {
    let tableRow = document.createElement('tr');
    if(type === 'participants') {
        let actionCell = document.createElement('td');

        let updateButton = document.createElement('button');
        updateButton.setAttribute('type','button');
        updateButton.innerHTML = 'UPDATE';
        updateButton.addEventListener('click',updateRowHandler);

        function updateRowHandler() {
            let updatedRow = getRowFormFields(config.participants.mockDataSet[index],columns,this.closest('tr'),index);
        }

        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('type','button');
        deleteButton.addEventListener('click',deleteRowHandler);
        deleteButton.innerHTML = 'DELETE';

        function deleteRowHandler() {
            config.participants.mockDataSet.splice(index, 1);
            this.closest('tr').remove();
        }
        actionCell.append(updateButton);
        actionCell.append(deleteButton);
        tableRow.append(actionCell);
    }
    columns.map((column, columnIndex) => {
        let tableCell = document.createElement('td');
        const fieldData = record[column.id];
        if(type === 'participants') {
            tableCell.innerHTML = getDisplayer(fieldData,column);
        } else {
            tableCell.innerHTML = fieldData;
        }
        tableRow.append(tableCell);
    });
    return tableRow;
}

function getDisplayer(fieldData,column) {
    const dataType = typeof fieldData;
    switch (dataType) {
        case 'boolean':
            return fieldData;
        case 'object':
            let displayer = column.displayer.pattern.split('\n').map(d => d.slice(1, -1));
            let seperator = column.displayer.separator + " ";
            if (Array.isArray(fieldData)) {
                let homeChecked = column.homeChecked;
                let obj;
                if (homeChecked) {
                    obj = fieldData.filter(a => a.context == 'home')[0];
                    if (!obj) {
                        obj = fieldData.filter(a => a.context == 'work')[0];
                    }
                } else {
                    obj = fieldData.filter(a => a.context == 'work')[0];
                    if (!obj) {
                        obj = fieldData.filter(a => a.context == 'home')[0];
                    }
                }
                displayer = displayer.map(i => obj[i]).filter(j => j).join(seperator);
            } else {
                displayer = displayer.map(i => fieldData[i]).filter(j => j).join(seperator);
            }
            return displayer;
        default: 
            return fieldData;
    }
}

function getFormDisplayer(fieldData,column,currentRow) {
    const dataType = typeof fieldData;
    let tableCell = document.createElement('td');
    let rootDiv = document.createElement('div');
    switch (dataType) {
        case 'boolean':
            updateForm(rootDiv,'',column.id,column.label,fieldData,dataType,false);
            tableCell.append(rootDiv);
            currentRow.append(tableCell);
            return fieldData;
        case 'object':
            let displayer = column.displayer.pattern.split('\n').map(d => d.slice(1, -1));
            let seperator = column.displayer.separator + " ";
            if (Array.isArray(fieldData)) {
                let homeChecked = column.homeChecked;
                let obj;
                if (homeChecked) {
                    obj = fieldData.filter(a => a.context == 'home')[0];
                    if (!obj) {
                        obj = fieldData.filter(a => a.context == 'work')[0];
                    }
                } else {
                    obj = fieldData.filter(a => a.context == 'work')[0];
                    if (!obj) {
                        obj = fieldData.filter(a => a.context == 'home')[0];
                    }
                }
                rootDiv.setAttribute('class','form-group row');
                Object.keys(displayer).map(function(i) {
                    updateForm(rootDiv,displayer[i],column.id,column.label,obj[displayer[i]],dataType,false);
                });

                tableCell.append(rootDiv);
                currentRow.append(tableCell);
            } else {
                rootDiv.setAttribute('class','form-group row');
                Object.keys(displayer).map(function(i) {
                    updateForm(rootDiv,displayer[i],column.id,column.label,fieldData[displayer[i]],dataType,false);
                });

                tableCell.append(rootDiv);
                currentRow.append(tableCell);
            }
            return displayer;
        default: 
            updateForm(rootDiv,'',column.id,column.label,fieldData,dataType,false);
            tableCell.append(rootDiv);
            currentRow.append(tableCell);
            return fieldData;
    }
}

function submitUpdatedData(fieldData,column,currentRow,index) {
    const dataType = typeof fieldData;
    let currentElement;
    switch (dataType) {
        case 'boolean':
            currentElement = currentRow.querySelectorAll('#' + column.id)[0];
            config.participants.mockDataSet[index][column.id] = currentElement.checked;
            return fieldData;
        case 'object':
            let displayer = column.displayer.pattern.split('\n').map(d => d.slice(1, -1));
            let seperator = column.displayer.separator + " ";
            if (Array.isArray(fieldData)) {
                let homeChecked = column.homeChecked;
                Object.keys(displayer).map(function(i) {
                    currentElement = currentRow.querySelectorAll('#' + column.id + '-' + displayer[i])[0];
                    if (homeChecked) {
                        config.participants.mockDataSet[index][column.id].filter(function(a) {
                            if(a.context === 'home') {
                                a[displayer[i]] = currentElement.value;
                            }
                        });
                    } else {
                        config.participants.mockDataSet[index][column.id].filter(function(a) {
                            if(a.context === 'work') {
                                a[displayer[i]] = currentElement.value;
                            }
                        });
                    }
                });
            } else {
                Object.keys(displayer).map(function(i) {
                    currentElement = currentRow.querySelectorAll('#' + column.id + '-' + displayer[i])[0];
                    config.participants.mockDataSet[index][column.id][displayer[i]] = currentElement.value;
                });
            }
            return fieldData;
        default: 
            currentElement = currentRow.querySelectorAll('#' + column.id)[0];
            config.participants.mockDataSet[index][column.id] = currentElement.value;
            return fieldData;
    }
}

function updateForm(rootDiv,subId,columnId,columnLabel,value,type,isFormPage) {
    let inputDiv;
    let labelForCell;
    if(!isFormPage) {
        labelForCell = document.createElement('label');
        labelForCell.setAttribute('class','col-sm-2 col-form-label');
        if(type === 'object') {
            labelForCell.setAttribute('for',columnLabel + '-' + subId);
            labelForCell.innerHTML = columnLabel + '-' + subId;
        } else {
            labelForCell.setAttribute('for',columnLabel);
            labelForCell.innerHTML = columnLabel;
        }
        inputDiv = document.createElement('div');
        inputDiv.setAttribute('class','col-sm-10');
    } else {
        inputDiv = document.createElement('div');
        labelForCell = document.createElement('span');
        if(type === 'object') {
            labelForCell.innerHTML = subId;
        } else {
            labelForCell.innerHTML = '';
        }
        
    }
    
    let inputElement = document.createElement('input');
    if(type === 'boolean') {
        inputElement.setAttribute('id',columnId);
        inputElement.setAttribute('name',columnId);
        inputElement.setAttribute('type','checkbox');
        if(value == 'true') {
            inputElement.setAttribute('checked',true);
        } else {
            inputElement.removeAttribute('checked');
        }
    } else {
        inputElement.setAttribute('type','text');
        if(type === 'object') {
            inputElement.setAttribute('id',columnId + '-' + subId);
            inputElement.setAttribute('name',columnId + '-' + subId);
            inputElement.setAttribute('placeholder',columnLabel + '-' + subId);
        } else {
            inputElement.setAttribute('id',columnId);
            inputElement.setAttribute('name',columnId);
            inputElement.setAttribute('placeholder',columnLabel);
        }
        inputElement.setAttribute('value',value);
    }
    if(!isFormPage) {
        inputDiv.append(inputElement);
        rootDiv.append(labelForCell);
        rootDiv.append(inputDiv);
    } else {
        inputDiv.append(inputElement);
        rootDiv.append(labelForCell);
        rootDiv.append(inputDiv);
    }
}

function getRowFormFields(record,columns,currentRow,index) {
    let actionCell;
    if(currentRow.firstElementChild === null) {
        actionCell = document.createElement('td');

        let updateButton = document.createElement('button');
        updateButton.setAttribute('type','button');
        updateButton.innerHTML = 'UPDATE';
        updateButton.addEventListener('click',updateFormHandler);

        function updateFormHandler() {
            let updatedRow = getRowFormFields(config.participants.mockDataSet[index],columns,this.closest('tr'),index);
        }

        let deleteButton = document.createElement('button');
        deleteButton.setAttribute('type','button');
        deleteButton.addEventListener('click',deleteFormHandler);
        
        function deleteFormHandler() {
            config.participants.mockDataSet.splice(index, 1);
            this.closest('tr').remove();
        };
        deleteButton.innerHTML = 'DELETE';
        actionCell.append(updateButton);
        actionCell.append(deleteButton);
    } else {
        actionCell = currentRow.firstElementChild;
    }
    currentRow.innerHTML = '';
    currentRow.setAttribute('data-editable',true);
    currentRow.setAttribute('data-index',index);
    currentRow.append(actionCell);
    columns.map((column, columnIndex) => {
        getFormDisplayer(record[column.id],column,currentRow);
    });
    return currentRow;
}

function editFormPage(participantsFormContent) {
    let rootDiv = document.createElement('div');
    rootDiv.setAttribute('class','row');

    let bsDiv = document.createElement('div');
    bsDiv.setAttribute('class','BootstrapForm');

    let childDiv = document.createElement('div');
    childDiv.setAttribute('class','col-sm-10');

    let form = document.createElement('form');
    form.setAttribute('class','formParticipants');

    let columns = config.participantsFormView.columns;
    Object.keys(columns).map(function(c) {
        let cellDiv = document.createElement('div');
        cellDiv.setAttribute('class','formBlock');

        let labelSpan = document.createElement('span');
        let labelEle = document.createElement('b');
        let breakEle = document.createElement('br');
        labelEle.innerHTML = columns[c].label.toString().toUpperCase();
        labelSpan.append(labelEle);
        cellDiv.append(labelSpan);
        cellDiv.append(breakEle);

        let fieldData = config.participantsForm.mockDataSet[0][columns[c].id];
        const dataType = typeof fieldData;
        switch (dataType) {
            case 'boolean':
                updateForm(cellDiv,'',columns[c].id,columns[c].label,fieldData,dataType,true);
                form.append(cellDiv);
                return fieldData;
            case 'object':
                let displayer = columns[c].displayer.pattern.split('\n').map(d => d.slice(1, -1));
                let seperator = columns[c].displayer.separator + " ";
                if (Array.isArray(fieldData)) {
                    let homeChecked = columns[c].homeChecked;
                    let obj;
                    if (homeChecked) {
                        obj = fieldData.filter(a => a.context == 'home')[0];
                        if (!obj) {
                            obj = fieldData.filter(a => a.context == 'work')[0];
                        }
                    } else {
                        obj = fieldData.filter(a => a.context == 'work')[0];
                        if (!obj) {
                            obj = fieldData.filter(a => a.context == 'home')[0];
                        }
                    }
                    Object.keys(displayer).map(function(i) {
                        updateForm(cellDiv,displayer[i],columns[c].id,columns[c].label,obj[displayer[i]],dataType,true);
                        form.append(cellDiv);
                    });
                } else {
                    Object.keys(displayer).map(function(i) {
                        updateForm(cellDiv,displayer[i],columns[c].id,columns[c].label,fieldData[displayer[i]],dataType,true);
                        form.append(cellDiv);
                    });
                }
                return displayer;
            default: 
                updateForm(cellDiv,'',columns[c].id,columns[c].label,fieldData,dataType,true);
                form.append(cellDiv);
                return fieldData;
        }
    });

    let rootUpdateBtn = document.createElement('div');
    let childUpdateBtn = document.createElement('div');
    let updateButton = document.createElement('input');
    updateButton.setAttribute('name','update');
    updateButton.setAttribute('id','updateBtn');
    updateButton.setAttribute('type','button');
    updateButton.setAttribute('value','Update');
    updateButton.addEventListener('click', updateHandler);
    childUpdateBtn.append(updateButton);
    rootUpdateBtn.append(childUpdateBtn);
    form.append(rootUpdateBtn);

    let breakEle = document.createElement('br');

    let rootCancelBtn = document.createElement('div');
    let childCancelBtn = document.createElement('div');
    let cancelButton = document.createElement('input');
    cancelButton.setAttribute('name','cancel');
    cancelButton.setAttribute('id','cancelBtn');
    cancelButton.setAttribute('type','button');
    cancelButton.setAttribute('value','Cancel');
    cancelButton.addEventListener('click', cancelHandler);
    childCancelBtn.append(cancelButton);
    rootCancelBtn.append(childCancelBtn);
    form.append(rootCancelBtn);

    childDiv.append(form);
    bsDiv.append(childDiv);
    rootDiv.append(bsDiv);
    participantsFormContent.append(rootDiv);

    function updateHandler() {
        let data = formToJSON(document.forms[0]);
        let formPostData = config.participantsForm.mockDataSet[0];
        let columns = config.participantsFormView.columns;
        for(var key in data) {
            if(key.toString().match('-')) {
                let mainKey = key.toString().split('-')[0];
                let subKey = key.toString().split('-')[1];
                let fieldData = formPostData[mainKey];
                Object.keys(columns).map(function(c) {
                    let column = columns[c];
                    let homeChecked = column.homeChecked;
                    let obj;
                    if(Array.isArray(fieldData)) {
                        if (homeChecked) {
                            obj = fieldData.filter(a => a.context == 'home')[0];
                            if (!obj) {
                                obj = fieldData.filter(a => a.context == 'work')[0];
                            }
                        } else {
                            obj = fieldData.filter(a => a.context == 'work')[0];
                            if (!obj) {
                                obj = fieldData.filter(a => a.context == 'home')[0];
                            }
                        }
                    } else {
                        obj = fieldData;
                    }
                    obj[subKey] = data[key];
                });
            } else {
                formPostData[key] = data[key];
            }
        }
        cancelHandler()
    }
    const formToJSON = elements => [].reduce.call(elements, (data, element) => {
        data[element.name] = element.value;
        return data;
    }, {});
    function cancelHandler() {
        if (participantsFormContent) {
            participantsFormContent.innerHTML = '';
            normalFormPage(participantsFormContent);
        }
    };


}

function normalFormPage (participantsFormContent) {
     let rootDiv = document.createElement('div');
    rootDiv.setAttribute('class','row');

    let bsDiv = document.createElement('div');
    bsDiv.setAttribute('class','BootstrapForm');

    let childDiv = document.createElement('div');
    childDiv.setAttribute('class','col-sm-10');

    let form = document.createElement('form');
    form.setAttribute('class','formParticipants');

    let columns = config.participantsFormView.columns;
    Object.keys(columns).map(function(c) {
        let spanElement;
        let cellDiv = document.createElement('div');
        cellDiv.setAttribute('class','formBlock');

        let labelSpan = document.createElement('span');
        let labelEle = document.createElement('b');
        let breakEle = document.createElement('br');
        labelEle.innerHTML = columns[c].label.toString().toUpperCase();
        labelSpan.append(labelEle);
        cellDiv.append(labelSpan);
        cellDiv.append(breakEle);

        let fieldData = config.participantsForm.mockDataSet[0][columns[c].id];
        const dataType = typeof fieldData;
        switch (dataType) {
            case 'boolean':
                spanElement = document.createElement('span');
                spanElement.innerHTML = fieldData;
                cellDiv.append(spanElement);                
                form.append(cellDiv);
                return fieldData;
            case 'object':
                let displayer = columns[c].displayer.pattern.split('\n').map(d => d.slice(1, -1));
                let seperator = columns[c].displayer.separator + " ";
                if (Array.isArray(fieldData)) {
                    let homeChecked = columns[c].homeChecked;
                    let obj;
                    if (homeChecked) {
                        obj = fieldData.filter(a => a.context == 'home')[0];
                        if (!obj) {
                            obj = fieldData.filter(a => a.context == 'work')[0];
                        }
                    } else {
                        obj = fieldData.filter(a => a.context == 'work')[0];
                        if (!obj) {
                            obj = fieldData.filter(a => a.context == 'home')[0];
                        }
                    }
                    Object.keys(displayer).map(function(i) {
                        spanElement = document.createElement('span');
                        spanElement.innerHTML = obj[displayer[i]];
                        cellDiv.append(spanElement);
                        breakEle = document.createElement('br');
                        cellDiv.append(breakEle);
                        form.append(cellDiv);
                    });
                } else {
                    Object.keys(displayer).map(function(i) {
                        spanElement = document.createElement('span');
                        spanElement.innerHTML = fieldData[displayer[i]];
                        cellDiv.append(spanElement);
                        breakEle = document.createElement('br');
                        cellDiv.append(breakEle);
                        form.append(cellDiv);
                    });
                }
                return displayer;
            default: 
                spanElement = document.createElement('span');
                spanElement.innerHTML = fieldData;
                cellDiv.append(spanElement);
                form.append(cellDiv);
                return fieldData;
        }
    });
    let rootEditBtn = document.createElement('div');
    let childEditBtn = document.createElement('div');
    let editButton = document.createElement('input');
    editButton.setAttribute('name','edit');
    editButton.setAttribute('id','editBtn');
    editButton.setAttribute('type','button');
    editButton.setAttribute('value','Edit');
    editButton.addEventListener('click', editHandler);
    childEditBtn.append(editButton);
    rootEditBtn.append(childEditBtn);
    form.append(rootEditBtn);
    childDiv.append(form);
    bsDiv.append(childDiv);
    rootDiv.append(bsDiv);
    participantsFormContent.append(rootDiv);   
    function editHandler() {
        if (participantsFormContent) {
            participantsFormContent.innerHTML = '';
            editFormPage(participantsFormContent);
        }
    };
}


