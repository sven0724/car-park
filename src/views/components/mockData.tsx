const usersData = [
    {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: 'Car Park 1'},
    {id: "51b88ae9-54bf-4ac7-90c9-27dfa9c3833d", name: 'test'},
    {id: "c5d27355-2e8e-49d3-be92-6a029b3e59e3", name: 'GalaxyCarPark'},
    {id: "da5baca7-9e83-43c7-92d6-a01879ca3de2", name: 'New Car Park'},
    {id: "e27f018f-6729-419c-b931-0209d50a373d", name: 'MyCarPark'},
  ];
const gateData = [
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: 'Car Park 1', pulse_width:'1000'},
  {id: "51b88ae9-54bf-4ac7-90c9-27dfa9c3833d", name: 'test', pulse_width:'1000'},
  {id: "c5d27355-2e8e-49d3-be92-6a029b3e59e3", name: 'GalaxyCarPark', pulse_width:'1000'},
  {id: "da5baca7-9e83-43c7-92d6-a01879ca3de2", name: 'New Car Park', pulse_width:'1000'},
  {id: "e27f018f-6729-419c-b931-0209d50a373d", name: 'MyCarPark', pulse_width:'1000'},
];

const carTypeData = [
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '120-567-334-5', type:'Private Car', status:'1'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '120-785-098-5', type:'Public Car', status:'0'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '236-000-456-5', type:'Private Car', status:'0'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '120-456-867-5', type:'Public Car', status:'0'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '123-634-334-5', type:'Private Car', status:'1'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '978-111-456-5', type:'Public Car', status:'1'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '765-780-334-5', type:'Private Car', status:'0'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '120-111-345-5', type:'Public Car', status:'1'},
]

const parkingZoneData = [
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '120-567-334-5', type:'Private Car', status:'1'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '120-785-098-5', type:'Public Car', status:'0'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '236-000-456-5', type:'Private Car', status:'0'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '120-456-867-5', type:'Public Car', status:'0'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '123-634-334-5', type:'Private Car', status:'1'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '978-111-456-5', type:'Public Car', status:'1'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '765-780-334-5', type:'Private Car', status:'0'},
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: '120-111-345-5', type:'Public Car', status:'1'},
]
const cameraData = [
  {id: "1", name: '120-567-334-5', Ip_Address:'Private Car', Last_Car_Plate:'1', Last_Response_Time:'dd'},
  {id: "2", name: '120-785-098-5', Ip_Address:'Public Car', Last_Car_Plate:'0', Last_Response_Time:'dd'},
  {id: "3", name: '236-000-456-5', Ip_Address:'Private Car', Last_Car_Plate:'0', Last_Response_Time:'dd'},
  {id: "4", name: '120-456-867-5', Ip_Address:'Public Car', Last_Car_Plate:'0', Last_Response_Time:'dd'},
  {id: "5" , name: '123-634-334-5', Ip_Address:'Private Car', Last_Car_Plate:'1', Last_Response_Time:'dd'},
  {id: "6", name: '978-111-456-5', Ip_Address:'Public Car', Last_Car_Plate:'1', Last_Response_Time:'dd'},
  {id: "7", name: '765-780-334-5', Ip_Address:'Private Car', Last_Car_Plate:'0', Last_Response_Time:'dd'},
  {id: "8", name: '120-111-345-5', Ip_Address:'Public Car', Last_Car_Plate:'1', Last_Response_Time:'dd'},
]
const loopData = [
  {id: "2b98084b-13a3-4159-9c58-fa4a274a222b", name: 'Car Park 1', Loop_Type:'Front'},
  {id: "51b88ae9-54bf-4ac7-90c9-27dfa9c3833d", name: 'test', Loop_Type:'Front'},
  {id: "c5d27355-2e8e-49d3-be92-6a029b3e59e3", name: 'GalaxyCarPark', Loop_Type:'Rear'},
  {id: "da5baca7-9e83-43c7-92d6-a01879ca3de2", name: 'New Car Park', Loop_Type:'Front'},
  {id: "e27f018f-6729-419c-b931-0209d50a373d", name: 'MyCarPark', Loop_Type:'Rear'},
];
const RAND_ID = '00000000-0000-0000-0000-0000000000';
const RecordEnquiryData = {
  "entranceRecord": {
  "carPlate": null,
  "octopusNumber": "56271555",
  "type": 0,
  "entryTime": "0001-01-01T00:00:00Z",
  "exiting": false,
  "exitingTime": null,
  "exited": false,
  "exitTime": null,
  "paid": false,
  "paidTime": null,
  "carParkId": "2b98084b-13a3-4159-9c58-fa4a274a222b",
  "currentZoneId": "2b900579-2570-42d5-b606-4acce208ac7d",
  "carParkName": null,
  "currentZoneName": null,
  "appInstanceId": "51c8c4b8-00bd-4bef-b5a4-d2bdc6187120",
  "entered": false,
  "entranceRecordHistories": [
  {
  "type": 0,
  "historyTime": "2021-07-17T03:55:48.37611Z",
  "entranceRecordId": "a53f8698-e5b0-4ff8-8701-e7e1c4a07071",
  "parkingZoneId": "2b900579-2570-42d5-b606-4acce208ac7d",
  "parkingZoneName": null,
  "id": "11a6626d-dabc-4772-ac9d-ca54f2329566",
  "name": null
  }
  ],
  "id": "a53f8698-e5b0-4ff8-8701-e7e1c4a07071",
  "name": null
  },
  "octopusData": {
  "action": "poll",
  "success": 1,
  "error": 0,
  "remainValue": 877.2,
  "oldCardId": "00000000",
  "newCardId": "56271555",
  "octopusType": 0,
  "lastAddValueDevice": "1",
  "class": 1,
  "language": 0,
  "availableAutoPay": 0,
  "targetMachine": "WorkStation",
  "errCode": 0,
  "fixAmount": 0
  },
  "message": "Payment Amount:1010.0"
  };
const PaymentData = {
  "entranceRecord": {
  "carPlate": null,
  "octopusNumber": "56271555",
  "type": 0,
  "entryTime": "0001-01-01T00:00:00Z",
  "exiting": false,
  "exitingTime": null,
  "exited": false,
  "exitTime": null,
  "paid": true,
  "paidTime": "2021-07-21T08:56:12.0572644Z",
  "carParkId": "2b98084b-13a3-4159-9c58-fa4a274a222b",
  "currentZoneId": "2b900579-2570-42d5-b606-4acce208ac7d",
  "carParkName": null,
  "currentZoneName": null,
  "appInstanceId": "51c8c4b8-00bd-4bef-b5a4-d2bdc6187120","entered": false,
  "entranceRecordHistories": [
  {
  "type": 0,
  "historyTime": "2021-07-20T03:55:48.37611Z",
  "entranceRecordId": "a53f8698-e5b0-4ff8-8701-e7e1c4a07071",
  "parkingZoneId": "2b900579-2570-42d5-b606-4acce208ac7d",
  "parkingZoneName": null,
  "id": "11a6626d-dabc-4772-ac9d-ca54f2329566",
  "name": null
  }
  ],
  "id": "a53f8698-e5b0-4ff8-8701-e7e1c4a07071",
  "name": null
  },
  "octopusData": {
  "action": "deduct",
  "success": 1,
  "error": 0,
  "remainValue": 37.2,
  "oldCardId": "00000000",
  "newCardId": "56271555",
  "octopusType": 0,
  "lastAddValueDevice": "",
  "class": 1,
  "language": 0,
  "availableAutoPay": 0,
  "targetMachine": "WorkStation",
  "errCode": 0,
  "fixAmount": 0,
  "processAmount": 0
  },
  "message": "Payment settled."
  };
  const SwapData = {"entranceRecord": {
    "carPlate": null,
    "octopusNumber": "56271555",
    "type": 0,
    "entryTime": "0001-01-01T00:00:00Z",
    "exiting": false,
    "exitingTime": null,
    "exited": false,
    "exitTime": null,
    "paid": true,
    "paidTime": "2021-07-21T08:56:12.057264Z",
    "carParkId": "2b98084b-13a3-4159-9c58-fa4a274a222b",
    "currentZoneId": "2b900579-2570-42d5-b606-4acce208ac7d",
    "carParkName": null,
    "currentZoneName": null,
    "appInstanceId": "51c8c4b8-00bd-4bef-b5a4-d2bdc6187120",
    "entered": false,
    "entranceRecordHistories": [
    {
    "type": 0,
    "historyTime": "2021-07-20T03:55:48.37611Z",
    "entranceRecordId": "a53f8698-e5b0-4ff8-8701-e7e1c4a07071",
    "parkingZoneId": "2b900579-2570-42d5-b606-4acce208ac7d",
    "parkingZoneName": null,
    "id": "11a6626d-dabc-4772-ac9d-ca54f2329566",
    "name": null
    }
    ],
    "id": "a53f8698-e5b0-4ff8-8701-e7e1c4a07071",
    "name": null
    },
    "octopusData": {
    "action": "poll",
    "success": 1,
    "error": 0,
    "remainValue": 37.2,
    "oldCardId": "00000000",
    "newCardId": "56271555",
    "octopusType": 0,
    "lastAddValueDevice": "1",
    "class": 1,
    "language": 0,
    "availableAutoPay": 0,
    "targetMachine": "WorkStation",
    "errCode": 0,
    "fixAmount": 0,
    "processAmount": 0
    },
    "message": "Swap card sucessful"
    };
  const RemainData = {
    "octopusData": {
    "action": "poll",
    "success": 1,
    "error": 0,
    "remainValue": 37.2,
    "oldCardId": "00000000",
    "newCardId": "56271555",
    "octopusType": 0,
    "lastAddValueDevice": "1",
    "class": 1,
    "language": 0,
    "availableAutoPay": 0,
    "targetMachine": "WorkStation",
    "errCode": 0,
    "fixAmount": 0,
    "processAmount": 0
    },
    "message": "Remain Value:37.2"
    };
  const AddData = {
    "octopusData": {
    "action": "poll",
    "success": 1,
    "error": 0,
    "remainValue": 37.2,
    "oldCardId": "00000000",
    "newCardId": "56271555",
    "octopusType": 0,
    "lastAddValueDevice": "1",
    "class": 1,
    "language": 0,
    "availableAutoPay": 0,
    "targetMachine": "WorkStation",
    "errCode": 0,
    "fixAmount": 0,
    "processAmount": 0
    },
    "message": "Remain Value:37.2"
    }


export { carTypeData, usersData, parkingZoneData, gateData, cameraData, loopData, RAND_ID, RecordEnquiryData, PaymentData, SwapData, RemainData, AddData} ;