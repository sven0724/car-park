/* eslint-disable */
import { useReactOidc } from '@axa-fr/react-oidc-context';
import { CButton, CButtonToolbar, CCard, CCardBody, CCardGroup, CCardHeader, CCardTitle, CDataTable, CFormGroup, CInput, CNav, CNavItem, CNavLink, CTabContent, CTabPane, CTabs, CTextarea, CModal, CModalBody } from '@coreui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import image from '../assets/images/image.png'
import { REACT_APP_APIURL, SIGNALR_URL, SERVER_URL, TEST_URL, COUPON_ALL_APIURL, CREATE_CUSTOMER, PAYBYCASH, PAYBYOCTUPUS, MONTHLY_PARKING_ORDER, MONTHLY_PARKING_RECORD, MONTHLY_PARKING_RATE, CHECKAVAILABILITYBYNAME } from '../configs/apiConfig';

import Modal from 'react-modal';

import { RecordEnquiryData } from './components/mockData';
import { useWorkstationHub } from '../services/work-station-hub';
import Loading from '../reusable/Loading';
import OctopusLoading from '../reusable/OctopusLoading';

import CustomLoading from '../reusable/CustomLoading';

const Operation = () => {

    const {logout } = useReactOidc();
    const token = sessionStorage.getItem('token');
    const orgID = sessionStorage.getItem('ORGID');
    const [activeKey, setActiveKey] = useState(1);
    const fields = [
        { key: 'historyTime', label: 'Date Time', _style: { width: '25%'} },
        { key: 'currentZoneName', label: 'zone Name', _style: { width: '25%'} },
        { key: 'octopusNumber', label: 'Octopus Number', _style: { width: '25%'} },
        { key: 'paid', label: 'Paid', _style: { width: '25%'} },
    ];
    const ticketfields = [
        { key: 'startTime', label: 'From', _style: { width: '15%'} },
        { key: 'endTime', label: 'To', _style: { width: '15%'} },
        { key: 'depositAmount', label: 'Deposit Amount', _style: { width: '25%'} },
        { key: 'rentAmount', label: 'Rent Amount', _style: { width: '15%'} },
        { key: 'totalAmount', label: 'Total', _style: { width: '15%'} },
        { key: 'payTime', label: 'Pay Time', _style: { width: '15%'} },
    ];
    const [item, setItem] = useState<any>([]);
    const [coupons, setCoupons] = useState([]);
    const [couponid, setCouponid] = useState('');

    const [usemessage, setMessage] = useState('');
    const [oldCard, setOldCard] = useState('');
    const [newCard, setNewCard] = useState('');
    const [amount, setAmount] = useState(0);
    const [deductAmount, setDeductAmount] = useState(0);
    const [id, setId] = useState('');
    const [bColor, setBColor] = useState('#FFF');
    const [bWidth, setBWidth] = useState(1);
    const [flag, setFlag] = useState(() => false);
    const curId = '42db6d19-72c8-4de0-a81b-db60b7b72f39';
    const {message, sound, isConnected} = useWorkstationHub("42db6d19-72c8-4de0-a81b-db60b7b72f39", SIGNALR_URL);

    const [customerinfo, setCustomerinfo] = useState({id: ''});
    const [customerid, setCustomerid] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactTel, setContactTel] = useState('');
    const [carPlate, setCarPlate] = useState('');
    const [octupusNumber, setOctupusNumber] = useState('');
    const [carSpaceNumber, setCarSpaceNumber] = useState('');
    const [email, setEmail] = useState('');
    const [remarks, setRemarks] = useState('');

    const [durationFrom, setDurationFrom] = useState('');
    const [durationFromTxt, setDurationFromtxt] = useState('');
    const [durationTotxt, setDurationTotxt] = useState('');
    const [durationTo, setDurationTo] = useState('');

    const [deposit, setDeposit] = useState(0);
    const [rent, setRent] = useState(0);
    const [total, setTotal] = useState(0);

    const [ticketmessage, setTicketmessage] = useState('');

    const [ticketrecord, setTicketrecord] = useState([]);

    const [montlyrates, setMontlyrates] = useState([{id:'', name: ''}]);

    const [ratevalid, setRatevalid] = useState({id:''});

    const [modalvisible, setModalvisible] = useState(false);

    const [searchKey, setSearchKey] = useState('phone');
    const [searchVal, setSearchVal] = useState('');

    // console.log("message: ", message);

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };
    const recordEnquiry = async () => {
        setMessage('');
        setFlag(true);
        var result = axios.request({
            url: REACT_APP_APIURL + 'OctopusOps/enquireHourlyPayment/'+couponid,
            method: 'GET',
            headers:{
                'Authorization': `${token}`,
                'ORGID': orgID,
            }
        });
        result.then((res) => {
            console.log("response: ", res.data);
            setFlag(false);
            if(res.data.entranceRecord !==null){
                setId(res.data.entranceRecord.id);
                var tmpData = [];
                for ( var i =0; i< res.data.entranceRecord.entranceRecordHistories.length; i++){
                    tmpData.push({
                        'historyTime': res.data.entranceRecord.entranceRecordHistories[i].historyTime.split('T')[0] + ' ' + res.data.entranceRecord.entranceRecordHistories[0].historyTime.split('T')[1].split('.')[0],
                        'currentZoneName': res.data.entranceRecord.currentZoneName || '',
                        'octopusNumber': res.data.entranceRecord.octopusNumber || '',
                        'paid': res.data.entranceRecord.paid === true ? 'paid': 'pending payment',
                    })
                }
                setItem(tmpData);
            } else {
                setItem([]);
            }

            setMessage(res.data.message);
            setOldCard(res.data.octopusData.oldCardId);
            setNewCard(res.data.octopusData.newCardId);

        }).catch((err) => {
            console.log("error: ", err);
            setFlag(false);
            if(err.response !== undefined){
                var errStatus = err.response.status;
                if(errStatus === 401) logout();
            }
        })

        //using dummy data
        // console.log("dummy data: ", RecordEnquiryData.entranceRecord);
        // await setItem([{
        //     'historyTime': RecordEnquiryData.entranceRecord.entranceRecordHistories[0].historyTime,
        //     'currentZoneName': RecordEnquiryData.entranceRecord.currentZoneName,
        //     'octopusNumber': RecordEnquiryData.entranceRecord.octopusNumber,
        //     'paid': RecordEnquiryData.entranceRecord.paid,
        // }]);
    }

    const payment = () => {
        setMessage('');
        if(oldCard ==='' || newCard ==='') alert('You must enquire first');
        else{
            setFlag(true);

            var result = axios.request({
                url: REACT_APP_APIURL + 'OctopusOps/settleHourlyPayment/' + newCard + '/' + oldCard,
                method: 'GET',
                headers:{
                    'Authorization': `${token}`,
                    'ORGID': orgID,
                }
            });
            result.then((res) => {
                console.log("response: ", res.data);
                setFlag(false);
                if(res.data.entranceRecord !==null ){
                    var tmpData = [];
                    for ( var i =0; i< res.data.entranceRecord.entranceRecordHistories.length; i++){
                        tmpData.push({
                            'historyTime': res.data.entranceRecord.entranceRecordHistories[i].historyTime.split('T')[0] + ' ' + res.data.entranceRecord.entranceRecordHistories[0].historyTime.split('T')[1].split('.')[0],
                            'currentZoneName': res.data.entranceRecord.currentZoneName || '',
                            'octopusNumber': res.data.entranceRecord.octopusNumber || '',
                            'paid': res.data.entranceRecord.paid === true ? 'paid': 'pending payment',
                        })
                    }
                    setItem(tmpData);
                } else {
                    setItem([]);
                }
                
                setMessage(res.data.message);
                //using dummy data;
    
    
            }).catch((err) => {
                console.log("error: ", err);
                setFlag(false);
                if(err.response !== undefined){
                    var errStatus = err.response.status;
                    if(errStatus === 401) logout();
                }
            })
        }
    }

    const swapCard = () => {
        setMessage('');
        
        if(oldCard ==='' || newCard ==='') alert('You must enquire first');
        else{
            setFlag(true);
            var result = axios.request({
                url: REACT_APP_APIURL + 'OctopusOps/swapOctopus/' + newCard + '/' + oldCard,
                method: 'GET',
                headers: {
                    'Authorization': `${token}`,
                    'ORGID': orgID,
                },
            });
            result.then((res) => {
                console.log("response: ", res.data);
                setFlag(false);
                if(res.data.entranceRecord !==null ){
                    var tmpData = [];
                    for ( var i =0; i< res.data.entranceRecord.entranceRecordHistories.length; i++){
                        tmpData.push({
                            'historyTime': res.data.entranceRecord.entranceRecordHistories[i].historyTime.split('T')[0] + ' ' + res.data.entranceRecord.entranceRecordHistories[0].historyTime.split('T')[1].split('.')[0],
                            'currentZoneName': res.data.entranceRecord.currentZoneName || '',
                            'octopusNumber': res.data.entranceRecord.octopusNumber || '',
                            'paid': res.data.entranceRecord.paid === true ? 'paid': 'pending payment',
                        })
                    }
                    setItem(tmpData);
                } else {
                    setItem([])
                }
                setMessage(res.data.message);
            }).catch((err) => {
                console.log("error: ", err);
                setFlag(false);
                if(err.response !== undefined){
                    var errStatus = err.response.status;
                    if(errStatus === 401) logout();
                }

            })
        }
    }

    const remainValue = () => {
        setMessage('');
        setFlag(true);
        var result = axios.request({
            url: REACT_APP_APIURL + 'OctopusOps/poll',
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'ORGID': orgID,
            }
        });
        result.then((res) => {
            console.log("response: ", res.data);
            setFlag(false);
            setMessage(res.data.message)
        }).catch((err) => {
            console.log("error: ", err);
            setFlag(false);
            var errStatus = err.response.status;
            if(errStatus === 401) logout();
        })
    }

    const addValue = () => {
        setMessage('');
        if(amount % 50 === 0) {
            setFlag(true);

            var result = axios.request({
                url: REACT_APP_APIURL + 'OctopusOps/addValue/' + amount,
                method: 'GET',
                headers: {
                'Authorization': `${token}`,
                'ORGID': orgID,
                }               
            });
            result.then((res) => {
                console.log(res.data);
                setMessage(res.data.message);
                setAmount(0);
                setFlag(false);
            }).catch((err) => {
                console.log("error: ", err);
                setFlag(false);
                var errStatus = err.response.status;
                if(errStatus === 401) logout();
            })
        } else {
            alert("Input value of multiple of 50");
        }
    }

    const deductValue = () => {
        setMessage('');

        setFlag(true);

        var result = axios.request({
            url: REACT_APP_APIURL + 'OctopusOps/deductValue/' + deductAmount,
            method: 'GET',
            headers: {
            'Authorization': `${token}`,
            'ORGID': orgID,
            }               
        });
        result.then((res) => {
            console.log(res.data);
            setMessage(res.data.message);
            setDeductAmount(0);
            setFlag(false);
        }).catch((err) => {
            console.log("error: ", err);
            setFlag(false);
            var errStatus = err.response.status;
            if(errStatus === 401) logout();
        })
    }

    const handleMessage = (e:any) => {
        console.log("text: ", e.target.value);
    }

    const handleAdd = (e:any) => {
        console.log("value: ", e.target.value);
        setAmount(e.target.value);

    }
    const handleDeduct = (e:any) => {
        console.log("Deduct value: ", e.target.value);
        setDeductAmount(e.target.value);
    }

    const createCustomer = () => {
        if(firstName === ''){window.alert('Please Input First Name.'); return;}
        if(lastName === ''){window.alert('Please Input Last Name.'); return;}
        if(contactTel === ''){window.alert('Please Input contactTel.'); return;}
        if(carPlate === ''){window.alert('Please Input carPlate.'); return;}
        if(octupusNumber === ''){window.alert('Please Input octupusNumber.'); return;}

        var result = axios.post(CREATE_CUSTOMER,{
            'firstName':firstName,
            'lastName':lastName,
            "email":email,
            'phone':contactTel,
            'remarks':remarks,
            'carPlate': carPlate,
            'octopusNo':octupusNumber,
            "id": "0000-0000-0000",
        },{
            headers:{
              'Authorization':token,
              'ORGID':orgID,
            }
        });

        result.then((res) => {
            console.log(res.data);
            window.alert('Created New Customer succefully.');
        }).catch((err) => {
            console.log("error: ", err);
        })
    }

    const searchCustomer = () => {
        let url = CREATE_CUSTOMER;
        if(searchKey === '') {
            window.alert('Please select searchKey');
            return;
        }
        var result = axios.request({
            url: url,
            method: 'GET',
            params: {
                page:1,
                filterBy: searchKey+'="'+searchVal+'"',
                pageSize:15,
            },
            headers: {
                'Authorization': `${token}`,
                'ORGID': orgID,
            }
        });
        console.log(searchKey, searchVal)
        result.then((res) => {
            if(res.data.data.length > 0){
                setCustomerinfo(res.data.data[0]);
                setCustomerid(res.data.data[0].id);
                setFirstName(res.data.data[0].firstName);
                setLastName(res.data.data[0].lastName);
                setRemarks(res.data.data[0].remarks);
                setOctupusNumber(res.data.data[0].octopusNo);
                setEmail(res.data.data[0].email);
                setCarPlate(res.data.data[0].carPlate);
                setContactTel(res.data.data[0].phone);
                getTicketRecords(res.data.data[0].id);
            } else {
                setCustomerid('');
                setFirstName('');
                setLastName('');
                setRemarks('');
                setOctupusNumber('');
                setEmail('');
                setCarPlate('');
                setTicketrecord([]);
            }
        }).catch((err) => {
            console.log("error: ", err);
        })
    }

    const changeDurationto = (month:any) => {
        if(carSpaceNumber === ''){
            window.alert('Please input carSpaceNumber.')
            return;
        }
        let months = 1;
        switch(montlyrates[month-1].name) {
            case '2 Months':
                months = 2;
                break;
            case '1 Month':
                months = 1;
                break;
        }

        let temp1 = new Date(Number(durationFrom.split('-')[0]), Number(durationFrom.split('-')[1])-1, Number(durationFrom.split('-')[2]));
        let temp = new Date(Number(durationFrom.split('-')[0]), Number(durationFrom.split('-')[1]) + months-1, Number(durationFrom.split('-')[2]));

        setDurationFromtxt(temp1.getFullYear()+'-'+temp1.getMonth()+'-'+temp1.getDate());
        setDurationTotxt(Number(temp.getMonth()+1)+'/'+temp.getDate()+'/'+temp.getFullYear());
        setDurationTo(temp.toString());

        var result = axios.request({
            url: MONTHLY_PARKING_RATE+montlyrates[month-1].id,
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'ORGID': orgID,
            }
        });
        result.then((res) => {
            setDeposit(res.data.monthlyRate);
            setRent(res.data.depositAmount);
            setTotal(res.data.monthlyRate+res.data.depositAmount);
        }).catch((err) => {
            console.log("error: ", err);
        })

        var checkvalid = axios.request({
            url: CHECKAVAILABILITYBYNAME+carSpaceNumber+"/"+temp1.getFullYear()+'-'+temp1.getMonth()+'-'+temp1.getDate()+"/"+temp.getFullYear()+'-'+temp.getMonth()+'-'+temp.getDate(),
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'ORGID': orgID,
            }
        });
        checkvalid.then((res) => {
            if(res.data === '') {
              setRatevalid({id: ''});  
            } else {
              setRatevalid(res.data)
            }
        }).catch((err) => {
            console.log("error: ", err);
        })
    }

    const paybycash = () => {
        if(customerid === '') {
            window.alert('please select customer');
            return;
        }
        if(total === 0) {
            window.alert('please select duration');
            return;
        }
        if(ratevalid.id === '') {
            window.alert('car space not available');
            return; 
        }
        var result = axios.post(PAYBYCASH, {
            'customerId':customerid,
            'parkingSpaceId':ratevalid.id,
            'startTime':durationFrom,
            'endTime':durationTotxt,
            'depositAmount': deposit,
            'rentAmount': rent,
            'totalAmount': total,
            'octopusNumber': octupusNumber,
            'id':'',
            'name':''
        },{
            headers:{
              'Authorization':token,
              'ORGID':orgID,
            }
        });

        result.then((res) => {
            console.log(res.data)
            getTicketRecords(customerid);
        }).catch((err) => {
            console.log(err)
        })
    }

    const paybyoctopus = () => {
        if(total == 0) return;
        var result = axios.request({
            url: PAYBYOCTUPUS+total,
            method: 'GET',
        });
        result.then((res) => {
            // console.log(res.data.message);
            setTicketmessage(res.data.message)
        }).catch((err) => {
            console.log("error: ", err);
        })
    }

    const getTicketRecords = (id: any) => {
        var result = axios.request({
            url: MONTHLY_PARKING_ORDER,
            method: 'GET',
            params: {
                page:1,
                filterBy: 'customerId="'+id+'"',
                pageSize:15,
            },
            headers: {
                'Authorization': `${token}`,
                'ORGID': orgID,
            }
        });
        result.then((res) => {
            setTicketrecord(res.data.data);
        }).catch((err) => {
            console.log("error: ", err);
        })
    }

    const getMonthlyRateAll = () => {
        var result = axios.request({
            url: MONTHLY_PARKING_RATE+"All",
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'ORGID': orgID,
            }
        });
        result.then((res) => {
            setMontlyrates(res.data);
        }).catch((err) => {
            console.log("error: ", err);
        })
    }

    useEffect(() => {
        if(message.length > 0){
            if(JSON.parse(message).templateId == 5 || JSON.parse(message).templateId == 7 || JSON.parse(message).templateId == 8 || JSON.parse(message).templateId == 9){
                setBColor('#1C1');
                setBWidth(15);
            } else if(JSON.parse(message).templateId == 10 || JSON.parse(message).templateId == 11) {
                setBColor('#F11');
                setBWidth(15);
            } else if (JSON.parse(message).templateId == 1) {
                setBColor('#FFF');
            }
            else {
                setBColor('#000');
                setBWidth(1);
            }
        }

        var couponAll = axios.request({
            url: COUPON_ALL_APIURL,
            method: 'GET',
            headers:{
                'Authorization': `${token}`,
                'ORGID': orgID,
            }
        });

        couponAll.then(res => {
            setCoupons(res.data)
        })

        getMonthlyRateAll();
    }, []);

    const closemodal = () => {
      setModalvisible(false)
    }

    const openmodal = () => {
      setModalvisible(true)
    }

    return(
        <CCard>
            <Modal
              isOpen={modalvisible}
              onRequestClose={closemodal}
              style={customStyles}
              contentLabel="Example Modal"
            >
                <div style={{width: '300px'}}>
                  <div style={{marginBottom: '10px'}}>
                    <h3>Search Key</h3>
                    <select
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                      style={{width: '100%', padding: '10px', border: '1px solid black'}}
                    >
                      <option value='phone'>Telephone</option>
                      <option value='carPlate'>Car plate</option>
                      <option value='octopusNo'>Octopus number</option>
                    </select>
                  </div>
                  <div style={{marginBottom: '10px'}}>
                    <h3>Search Value</h3>
                    <input
                      type="text"
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                      style={{width: '100%', padding: '10px', border: '1px solid black'}}
                    />
                  </div>
                  <CButton className={'btn-primary'} style={{width:'60%', marginBottom: '10px', float: 'right'}} onClick={searchCustomer}>
                    Search
                  </CButton>
                </div>
            </Modal>

            <CCardBody>
                    <CFormGroup className={'row'}>
                        <CCard className={'col-5 border-0'}>
                        
                            <CCardBody style={{border: `${bWidth}px solid`,borderColor: bColor, padding: 0}}>
                                {   
                                    message.length > 0 && JSON.parse(message).templateId !== 1 ?
                                    <div className={'row'} style={{height:'100%', margin: 0, minHeight:'243px'}}>
                                        {
                                            message.length > 0 && JSON.parse(message).messageEN !== null && (JSON.parse(message).templateId === 2)?
                                            <div className={'h5 mb-4 text-center mt-4'} style={{padding: '10px'}}>
                                                <span className={'h2'}>{'    '}{JSON.parse(message).messageEN}{' on the Octopus reader'}</span><br></br>
                                                <span className={'h2'}>{'請於八達通機'}{JSON.parse(message).messageCN}{}</span><br></br>

                                            </div>:<div></div>
                                        }
                                        {
                                            message.length > 0 && (JSON.parse(message).templateId === 3)?
                                            <>
                                            <div className={'col-12'} style={{background: 'rgb(254, 127, 0)', height:'15%'}}>

                                            </div>
                                            <div className={' col-4 text-right'} style={{background: 'rgb(203, 203, 203)', height: '85%'}}>
                                                <span>{'餘額' + ' '}</span><br></br>
                                                <span>{'Remaining'}</span><br></br><span>{ 'Value' + ' '}</span>
                                            </div>
                                            <div className={'h5 col-8 text-right'}>
                                                <span className={'h2'}>{  '$' + JSON.parse(message).octopusData.RemainValue}{}</span>
                                            </div>
                                            <br></br>
                                            </>:<div></div>
                                        }
                                        {
                                            message.length > 0 && (JSON.parse(message).templateId === 4)?
                                            <>
                                            <div className={'col-12 text-center'} style={{background: 'rgb(254, 127, 0)', height:'25%'}}>
                                               <p className={'h4'} style={{marginBottom: 0}}>{'請拍卡 Tap Octopus'}</p>
                                            </div>
                                            <div className={' col-4 text-center'} style={{background: 'rgb(255, 255, 255)', height: '75%'}}>
                                                <p className={'mt-3 h3'}  style={{marginBottom: 0}}>{'金額' + ' '}</p>
                                                <p className={'h5'} style={{marginBottom: 0}}>{'Amount' + ' '}</p>
                                            </div>
                                            <div className={'h5 col-8 text-center'}>
                                                <p className={'h2 mt-4'}>{  '$' + JSON.parse(message).octopusData.ProcessAmount}{}</p>
                                            </div>
                                            <br></br>
                                            </>:<div></div>
                                        }
                                        {
                                            message.length > 0 && (JSON.parse(message).templateId === 5)?
                                            <>
                                            <div className={'col-12 text-center'} style={{background: 'rgb(254, 127, 0)', height:'12%'}}>
                                                <span>{'交易摘要 Transaction summary'}{}</span>
                                            </div>
                                            <div className={'col-4 text-right'} style={{background: 'rgb(203, 203, 203)', height: '88%', padding: 0}}>
                                                <p style={{marginBottom: 0}}>{'增值金額' + ' '}</p>
                                                <p style={{marginBottom: 0}}>{'Add Value'}</p>
                                                <p style={{marginBottom: 0}}>{' Amount' + ' '}</p><hr style={{margin: 0}}></hr>
                                                <p style={{marginBottom: 0}}>{'餘額' + ' '}</p>
                                                <p style={{marginBottom: 0}}>{'Remaining'}</p>
                                                <p  style={{marginBottom: 0}}>{' Value' + ' '}</p><hr style={{margin: 0}}></hr>
                                            </div>
                                            <div className={'h5 col-8'}>
                                                <p className={'h2 mt-3 ml-5'}>{  '+$' + JSON.parse(message).octopusData.ProcessAmount}{}</p><br></br>
                                                <p className={'h2 ml-5'}>{  '$' + JSON.parse(message).octopusData.RemainValue}{}</p>
                                            </div>
                                            <br></br>
                                            </>:<div></div>
                                        }
                                        {
                                            message.length > 0 && (JSON.parse(message).templateId === 6)?
                                            <>
                                            <div className={'col-12 text-center'} style={{background: 'rgb(254, 127, 0)', height:'25%'}}>
                                               <p className={'h4'} style={{marginBottom: 0}}>{'請拍卡 Tap Octopus'}</p>
                                            </div>
                                            <div className={' col-4 text-center'} style={{background: 'rgb(255, 255, 255)', height: '75%'}}>
                                                <p className={'mt-3 h3'}  style={{marginBottom: 0}}>{'金額' + ' '}</p>
                                                <p className={'h5'} style={{marginBottom: 0}}>{'Amount' + ' '}</p>
                                            </div>
                                            <div className={'h5 col-8 text-center'}>
                                                <p className={'h2 mt-4'}>{  '$' + JSON.parse(message).octopusData.ProcessAmount}{}</p>
                                            </div>
                                            <br></br>
                                            </>:<div></div>
                                        }
                                        {
                                            message.length > 0 && (JSON.parse(message).templateId === 7)?
                                            <>
                                            <div className={'col-12 text-center'} style={{background: 'rgb(254, 127, 0)', height:'12%'}}>
                                                <span>{'交易摘要 Transaction summary'}{}</span>
                                            </div>
                                            <div className={'col-4 text-right'} style={{background: 'rgb(203, 203, 203)', height: '88%', padding: 0}}>
                                                <p style={{marginBottom: 0}}>{'交易金額' + ' '}</p>
                                                <p style={{marginBottom: 0}}>{'Transaction'}</p>
                                                <p style={{marginBottom: 0}}>{'amount' + ' '}</p><hr style={{margin: 0}}></hr>
                                                <p style={{marginBottom: 0}}>{'餘額' + ' '}</p>
                                                <p style={{marginBottom: 0}}>{'Remaining'}</p>
                                                <p style={{marginBottom: 0}}>{' Value' + ' '}</p><hr style={{margin: 0}}></hr>
                                            </div>
                                            <div className={'h5 col-8 text-right'}>
                                                <p className={'h2 mt-3 mr-5'}>{  '-$' + JSON.parse(message).octopusData.ProcessAmount}{}</p><br></br>
                                                <p className={'h2 mr-5'}>{  ' $' + JSON.parse(message).octopusData.RemainValue}{}</p>
                                            </div>
                                            <br></br>
                                            </>:<div></div>
                                            
                                        }
                                        {
                                            message.length > 0 && (JSON.parse(message).templateId === 8)?
                                            <>
                                            <div className={'col-12 text-center'} style={{background: 'rgb(254, 127, 0)', height:'10%'}}>
                                                <span>{'交易摘要 Transaction summary'}{}</span>
                                            </div>
                                            <div className={'col-4 text-right'} style={{background: 'rgb(203, 203, 203)', height: '90%', padding: 0}}>
                                                <p style={{marginBottom: 0}}>{'自動增值' + ' '}</p>
                                                <p style={{marginBottom: 0}}>{'Auto Reload'}</p><p style={{marginBottom: 0}}>{' Amount' + ' '}</p><hr style={{margin: 0}}></hr>
                                                <p style={{marginBottom: 0}}>{'增值金額' + ' '}</p>
                                                <p style={{marginBottom: 0}}>{'Transaction '}</p><p style={{marginBottom: 0}}>{' Amount' + ' '}</p><hr style={{margin: 0}}></hr>
                                                <p style={{marginBottom: 0}}>{'餘額' + ' '}</p>
                                                <p style={{marginBottom: 0}}>{'Remaining'}</p><p style={{marginBottom: 0}}>{' Value' + ' '}</p>
                                            </div>
                                            <div className={'h5 col-8 text-right'}>
                                                <p className={'h2 mt-3 mr-5'}>{  '+$' + JSON.parse(message).octopusData.AutoPayValue}{}</p><br></br>
                                                <p className={'h2 mr-5'}>{  '-$' + JSON.parse(message).octopusData.ProcessAmount}{}</p><br></br>
                                                <p className={'h2 mr-5'}>{ ' ' }{'$' + JSON.parse(message).octopusData.RemainValue}{}</p>
                                            </div>
                                            <br></br>
                                            </>:<div></div>
                                            
                                        }
                                        {
                                            message.length > 0 && (JSON.parse(message).templateId === 9)?
                                            <>
                                            <div className={'col-12 text-center'} style={{background: 'rgb(254, 127, 0)', height:'10%'}}>
                                                <span>{'交易摘要 Transaction summary'}{}</span>
                                            </div>
                                            <div className={'col-3 text-center'} style={{background: 'rgb(203, 203, 203)', height: '90%', padding: 0}}>
                                                <p style={{marginBottom: 0}}>{'交易金額' + ' '}</p>
                                                <p style={{marginBottom: 0}}>{'Transaction amount' + ' '}</p><hr style={{margin: 0}}></hr>
                                                <p style={{marginBottom: 0}}>{'餘額' + ' '}</p>
                                                <p style={{marginBottom: 0}}>{'Remaining Value' + ' '}</p><hr style={{margin: 0}}></hr>
                                                <p style={{marginBottom: 0, color: 'rgb(203, 203, 203)' }}>{'餘額' + ' '}</p>
                                                <p style={{marginBottom: 0, color: 'rgb(203, 203, 203)'}}>{'Remaining Value' + ' '}</p>
                                            </div>
                                            <div className={'h5 col-9 text-right'}>
                                                <p className={'h2 mt-3 mr-5'}>{  '-$' + JSON.parse(message).octopusData.ProcessAmount}{}</p><br></br>
                                                <p className={'h2 mr-5'} style={{color: 'red'}} >{  '-$' + Math.abs(JSON.parse(message).octopusData.RemainValue)}{}</p>
                                                <p className={'h5 mt-3 mr-5'} style={{color: 'red'}}>{JSON.parse(message).messageCN + JSON.parse(message).messageEN}</p>
                                            </div>
                                            <br></br>
                                            </>:<div></div>
                                      
                                        }
                                        {
                                            message.length > 0 && JSON.parse(message).messageEN !== null && JSON.parse(message).templateId === 10 ?
                                            <div className={'h5 mb-4 text-center'} style={{color: 'red', width: '100%'}}>
                                                <span className={'h2'}>{JSON.parse(message).messageCN}</span><br></br>
                                                <span className={'h2'}>{'    '}{JSON.parse(message).messageEN}</span><br></br><br></br>
                                                <span className={'h2'}>{'餘額 Remaining Value' + ' ' }</span><br></br><span className={'h2'}>{ '$' + JSON.parse(message).octopusData.RemainValue}</span><br></br>
                                            </div>:<div></div>
                                        }
                                        {
                                            message.length > 0 && JSON.parse(message).messageEN !== null && (JSON.parse(message).templateId === 11 || JSON.parse(message).templateId === 12 || JSON.parse(message).templateId === 13)?
                                            <div className={'h5 m-auto text-center'} style={{color: 'red'}}>
                                                <span className={'h2'}>{JSON.parse(message).messageCN}</span><br></br>
                                                <span className={'h2'}>{'    '}{JSON.parse(message).messageEN}</span><br></br>
                                            </div>:<div></div>
                                        }

                                    </div>:
                                    <div className="col-12"><img src={image} alt='image' style={{width:'108%'}} /></div>
                                }
                            </CCardBody>
                        </CCard>
                        <div className={'col-1'}></div>
                        <CCard className={'col-6'}>
                            <CTabs activeTab="home">
                                <CNav variant="tabs">
                                    <CNavItem>
                                        <CNavLink data-tab="home" onClick={() => setActiveKey(1)}>
                                            Hourly Rent
                                        </CNavLink>
                                    </CNavItem>
                                    <CNavItem>
                                        <CNavLink data-tab="ticket" onClick={() => setActiveKey(3)}>
                                            Monthly Ticket
                                        </CNavLink>
                                    </CNavItem>
                                    <CNavItem>
                                        <CNavLink data-tab="profile" onClick={() => setActiveKey(2)}>
                                            Octopus
                                        </CNavLink>
                                    </CNavItem>
                                </CNav>
                            <CTabContent>
                                <CTabPane data-tab="home">
                                    <CButtonToolbar  className={'justify-content-between mt-3'} >
                                        {/*<CButton className={'btn-primary'} style={{width: '40%'}} onClick={() =>recordEnquiry()}>Record Enquiry</CButton>
                                        <CButton className={'btn-primary'} style={{width: '40%'}}>Coupon Redeem</CButton>*/}
                                    </CButtonToolbar>
                                    <CButtonToolbar  className={'justify-content-between mt-3'}>
                                        {/*<CButton className={'btn-primary'} style={{width: '40%'}} onClick={payment}>Payment</CButton>*/}
                                        <CButton className={'btn-primary'} style={{width: '40%'}}>Fix Charge</CButton>
                                    </CButtonToolbar>
                                    <CButtonToolbar  className={'justify-content-between mt-3'}>
                                        <CButton className={'btn-primary'} style={{width: '40%'}} onClick={swapCard}>Swap Card</CButton>
                                    </CButtonToolbar>
                                </CTabPane>
                                <CTabPane data-tab="ticket">
                                    <CButtonToolbar  className={'justify-content-between mt-3'}>
                                        {/*<CButton className={'btn-primary'} style={{width: '40%'}} onClick={payment}>Payment</CButton>*/}
                                        <CButton className={'btn-primary'} style={{width: '60%'}}>Record Enquiry By Octopus</CButton>
                                    </CButtonToolbar>
                                    <CButtonToolbar  className={'justify-content-between mt-3'}>
                                        <CButton className={'btn-primary'} style={{width: '60%'}}>Create New Ticket</CButton>
                                    </CButtonToolbar>
                                </CTabPane>
                                <CTabPane data-tab="profile">
                                    <CButtonToolbar className={'justify-content-between mt-3'}>
                                            <CButton className={'btn-primary'} style={{width: '40%'}} onClick={remainValue}>Remain Value</CButton>
                                    </CButtonToolbar>
                                    <CButtonToolbar className={'justify-content-between mt-3'}>
                                        <CButton className={'btn-primary'} style={{width: '40%'}} onClick={addValue}>Add Value</CButton>
                                        <CInput                         
                                            className="is-valid w-50"
                                            type={'number'}
                                            id="amount"
                                            name="amount"
                                            placeholder="0.00"
                                            autoComplete="given-name"
                                            required
                                            onChange={(e) => handleAdd(e)}
                                            value={amount}
                                        />
                                    </CButtonToolbar>
                                    <CButtonToolbar className={'justify-content-between mt-3'}>
                                        <CButton className={'btn-primary'} style={{width: '40%'}} onClick={deductValue}>Deduct Value</CButton>
                                        <CInput                         
                                            className="is-valid w-50"
                                            type={'number'}
                                            id="amount"
                                            name="amount"
                                            placeholder="0.00"
                                            autoComplete="given-name"
                                            required
                                            onChange={(e) => handleDeduct(e)}
                                            value={deductAmount}
                                        />
                                    </CButtonToolbar>
                                    
                                </CTabPane>
                                
                            </CTabContent>
                            </CTabs>
                        </CCard>
                        {
                            activeKey === 2 && flag === true ?<OctopusLoading />:
                            null
                        }
                        {
                            activeKey === 3 ? 
                                <div style={{width: '100%'}}>
                                    <p style={{marginBottom: 0}}>Customer Information</p>
                                    <div style={{padding: 20, border: '1px solid #dfdfdf', marginBottom: 20, display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))'}}>
                                        <div>
                                            <label>First Name</label>
                                            <input style={{float: 'right', marginRight: '20px'}} value={firstName} onChange={(e) => setFirstName(e.target.value)} /><br/>
                                            <label>Last Name</label>
                                            <input style={{float: 'right', marginRight: '20px'}} value={lastName} onChange={(e) => setLastName(e.target.value)} /><br/>
                                            <label>Contact Tel</label>
                                            <input style={{float: 'right', marginRight: '20px'}} value={contactTel} onChange={(e) => setContactTel(e.target.value)} /><br/>
                                            <label>Car Plate</label>
                                            <input style={{float: 'right', marginRight: '20px'}} value={carPlate} onChange={(e) => setCarPlate(e.target.value)} />
                                        </div>
                                        <div>
                                            <label>Octupus Number</label>
                                            <input style={{float: 'right', marginRight: '20px'}} value={octupusNumber} onChange={(e) => setOctupusNumber(e.target.value)} /><br/>
                                            <label>Car Space Number</label>
                                            <input style={{float: 'right', marginRight: '20px'}} value={carSpaceNumber} onChange={(e) => setCarSpaceNumber(e.target.value)} /><br/>
                                            <label>Email</label>
                                            <input style={{float: 'right', marginRight: '20px'}} value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
                                            <label>Remarks</label>
                                            <input style={{float: 'right', marginRight: '20px'}} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                                        </div>
                                        <div>
                                            <CButton className={'btn-primary'} style={{width:'60%', marginBottom: '10px', float: 'right'}} onClick={openmodal}>Search</CButton>
                                            <CButton className={'btn-primary'} style={{width:'60%', marginBottom: '10px', float: 'right'}} onClick={createCustomer}>Create</CButton>
                                        </div>
                                    </div>
                                    <p style={{marginBottom: 0}}>Ticket Duration</p>
                                    <div style={{padding: 20, border: '1px solid #dfdfdf', marginBottom: 20, display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))'}}>
                                        <div>
                                            <label>From</label>
                                            <input type="date" style={{float: 'right', marginRight: '20px'}} value={durationFrom} onChange={(e) => setDurationFrom(e.target.value)} /><br/>
                                        </div>
                                        <div>
                                            <label style={{marginBottom: 30}}>To</label>
                                            <input style={{float: 'right', marginRight: 20, marginBottom: 20}} type='text' value={durationTotxt} /><br/>
                                            {
                                                montlyrates.map((rate, index) => (
                                                    <button style={{padding: '10px 15px', marginRight: '10px', marginBottom: '10px', border: '1px solid #fe7f00', color: '#fe7f00', borderRadius: '20%', backgroundColor: 'white'}} onClick={() => changeDurationto(index+1)}>
                                                        {rate.name}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <p style={{marginBottom: 0}}>Payment Detail</p>
                                    <div style={{padding: 20, border: '1px solid #dfdfdf', marginBottom: 20}}>
                                        <label>Deposit</label>
                                        <input style={{margin: '0 5px'}} type='number' value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} />
                                        <label>Rent</label>
                                        <input style={{margin: '0 5px'}} type='number' value={rent} onChange={(e) => setRent(Number(e.target.value))} />
                                        <label>Total</label>
                                        <input style={{margin: '0 5px'}} type='number' value={total} onChange={(e) => setTotal(Number(e.target.value))} />
                                        <CButton className={'btn-primary'} style={{margin: '0 5px', float: 'right'}} onClick={paybyoctopus}>Pay By Octopus</CButton>
                                        <CButton className={'btn-primary'} style={{margin: '0 5px', float: 'right'}} onClick={paybycash}>Pay By Cash</CButton>
                                    </div>
                                    <p style={{marginBottom: 0}}>System Message</p>
                                    <div>
                                        <CTextarea className={'col-12 text-center h4'} value={ticketmessage}>
                                        </CTextarea>
                                    </div>
                                    <p style={{marginBottom: 0}}>Monthly Ticket Records</p>
                                    <div>
                                        <CDataTable
                                            items={ticketrecord} 
                                            fields={ticketfields}
                                            striped
                                            itemsPerPageSelect={{label:'Items per page', values:[5, 10, 15, 30]}}
                                            itemsPerPage={10}
                                            hover
                                            sorter
                                            pagination
                                            footer
                                        />
                                    </div>
                                </div>
                            : null
                        }
                        {
                            activeKey === 1 ? 
                                <div style={{width: '100%'}}>
                                    <p style={{marginBottom: 0}}>Redemption</p>
                                    <div style={{padding: 20, border: '1px solid #dfdfdf', marginBottom: 20}}>
                                        {
                                            coupons.map((citem:any, index:number) => (
                                                <button key={index} onClick={() => setCouponid(citem.id)} style={{padding: '10px 15px', margin: '0 10px', border: '1px solid #fe7f00', color: '#fe7f00', borderRadius: '20%', backgroundColor: 'white'}}>
                                                    {citem.name}
                                                </button>
                                            ))
                                        }
                                            <button onClick={() => setCouponid("")} style={{padding: '10px 15px', margin: '0 10px', border: '1px solid #fe7f00', color: '#fe7f00', borderRadius: '20%', backgroundColor: 'white'}}>
                                                    none
                                            </button>
                                        <CButton className={'btn-primary'} style={{width: '20%', float: 'right'}} onClick={() =>recordEnquiry()}>Record Enquiry</CButton>
                                    </div>
                                    <p style={{marginBottom: 0}}>System message</p>
                                    <div style={{marginBottom: 50}}>
                                        <CTextarea className={'col-12 text-center h4'} value={usemessage || ''} onChange={(e) => handleMessage(e)}>
                                        </CTextarea>
                                        <CButton className={'btn-primary'} style={{width: '20%', float: 'right'}} onClick={payment}>Payment</CButton>
                                    </div>
                                    <p style={{marginBottom: 0}}>Entry Record</p>
                                    {
                                        activeKey === 1 ?
                                        ( flag === false ? 
                                            <CDataTable
                                            items={item} 
                                            fields={fields}
                                            striped
                                            itemsPerPageSelect={{label:'Items per page', values:[5, 10, 15, 30]}}
                                            itemsPerPage={10}
                                            hover
                                            sorter
                                            pagination
                                            footer
                                        />:<CustomLoading />)
                                        :''
                                    }
                                </div>
                            : null
                        }
                    </CFormGroup>
                    
                </CCardBody>
        </CCard>
    )
}

export default Operation;