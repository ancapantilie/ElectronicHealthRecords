var date = new Date();
var xml = new XMLHttpRequest();
xml.open('GET', 'medicaldata.xml', false);
xml.send();
if(!xmlData){
    xmlData = (new DOMParser()).parseFromString(xml.responseText,'text/xml');
}

function showAllPacients(){
    var  xmlData = xml.responseXML;
    document.getElementById('display').innerHTML= "";
    for(i = 0; i < xmlData.getElementsByTagName('EHR')[0].children.length;i++){
        var aux = xmlData.getElementsByTagName('EHR')[i];
        var name = aux.getElementsByTagName("patient")[0].firstChild.data;
        document.getElementById('display').innerHTML += name + "</br>";
    }
}

function medicineDescription(){
    var  xmlData = xml.responseXML;
    document.getElementById('display').innerHTML= "";
    var medicationName = document.getElementById('medicineName').value;
    //document.getElementById('display').innerHTML += medicationName + "</br>";
    for(i = 0; i < xmlData.getElementsByTagName('EHR')[0].children.length;i++){
        var aux = xmlData.getElementsByTagName('EHR')[i];
        var medication = aux.getElementsByTagName('medication')[0].firstChild.data;
        var medicationInfo = aux.getElementsByTagName('medicationInfo')[0].firstChild.data;
        if(medicationName == medication){
            document.getElementById('display').innerHTML += medicationInfo + "</br>";
        }
    }
}

function noRadiology(){
    var  xmlData = xml.responseXML;
    var radiologyList = document.getElementById('radiologyList');
    for(i = 0; i < xmlData.getElementsByTagName('EHRs')[0].children.length; i++){
        var aux = xmlData.getElementsByTagName('EHR')[i];
        var image = aux.getElementsByTagName('radiologyImage')[0];
        var name = aux.getElementsByTagName('patient')[0].firstChild.data;
        if(image){
            radiologyList.innerHTML += '<li id="hasImg">' + name + "</li>";
        } else {
            radiologyList.innerHTML += '<li id="hasNoImg">' + name + "</li>";
        }
    }
    
}

function allergies(){
    var  xmlData = xml.responseXML;
    var countAllergies = 0;
    document.getElementById('display').innerHTML = "";
    document.getElementById('display').innerHTML += "The allergies patients suffer from: " + "</br>"
    for(i = 0; i < xmlData.getElementsByTagName('EHRs')[0].children.length; i++){
        var aux = xmlData.getElementsByTagName('EHR')[i];
        var allergy = aux.getElementsByTagName('allergies')[0].textContent;
        document.getElementById('display').innerHTML += allergy + "</br>";
        countAllergies++;
    }
    document.getElementById('display').innerHTML += "The number of persons suffering from allergies: " + countAllergies;
}

function doneTests(){
    var xmlData = xml.responseXML;
    //var currentDate = date.getMonth()+1;
    //var lastThreeMonths = currentDate - 3;
    document.getElementById('display').innerHTML = "Patients who had laboratory test results done during the last 3 months:" + "</br>";
    for(i = 0; i < xmlData.getElementsByTagName('EHRs')[0].children.length; i++){
        var aux = xmlData.getElementsByTagName('EHR')[i];
        var patients = aux.getElementsByTagName('patient')[0].textContent;
        var labTests = aux.getElementsByTagName('labTestResults');
        var result = labTests[0].getElementsByTagName('labTestResult');
        var date = result[i].getAttribute('date');
        if(date){
            newDate = date.substr(3,2);
        }
        if(newDate == 08){
            document.getElementById('display').innerHTML += patients + "</br>"
        }
    }
}

function immunizationsByDate(){
    var xmlData = xml.responseXML;
    var date = document.getElementById('immunization').value;
    for(i = 0;i < xmlData.getElementsByTagName('EHRs')[0].children.length; i++){
        var aux = xmlData.getElementsByTagName('EHR')[i];
        var patient = aux.getElementsByTagName('patient')[0].textContent;
        var immunizationDates = aux.getElementsByTagName('immunizationDates');
        var immunizationDate = immunizationDates[0].getElementsByTagName('immunizationDate');
        for(j = 0; j< immunizationDate.length; j++){
            var x = immunizationDate[j];
            var immunizationName = x.textContent;
            var getDate = x.getAttribute('date');
            if(getDate == date){
                document.getElementById('display').innerHTML += getDate + " " + patient +" " + immunizationName;
            }
        }
    }
}

function treatmentPlan(){
    var xmlData = xml.responseXML;
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var previousYear = year - 1;
    for(i = 0;i < xmlData.getElementsByTagName('EHRs')[0].children.length; i++){
        var aux = xmlData.getElementsByTagName('EHR')[i];
        var treatmentPlans = aux.getElementsByTagName('treatmentPlans');
        var treatmentPlan = treatmentPlans[0].getElementsByTagName('treatmentPlan');
        for(j = 0; j < treatmentPlan.length; j++){
            var planList = treatmentPlan[j];
            var planDescription = planList.textContent;
            var treatmentDate = planList.getAttribute('startDate');
            if (treatmentDate){
                var treatmentYear = treatmentDate.substr(6,4);
                if( previousYear == treatmentYear) {
                   document.getElementById('display').innerHTML += "Last year's treatment plans:" + "</br>" + planDescription + "</br>";
                }
            }
        }
    }
}