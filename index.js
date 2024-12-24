const a=require('express');
const b=a();
const port=process.env.PORT;
const data=require('./coursedata.json');
const fs=require('fs');

b.get('/',(req,res)=>{
    res.send('This is REST-API');
})

// API- Application Programming Interface - will allows two software applications to communicate with each other using req and res.

// REST API- Representational State Trasfer-REST (representational state transfer) is a software architectural style that was created to guide the design and development of the architecture for the World ...
// -type of API - it will use REST architecture - http methods-get,post,delete,patch,put

// CRUD - Create, Read, Update and Delete operations

b.use(a.json());
b.use(a.urlencoded({extended:true}));

// Read Operation
b.get('/getdata',(req,res)=>{
    res.send(data);
})

// Create operation
b.post('/create',(req,res)=>{
    const body=req.body;
    data.push({...body,id:data.length+1});
    console.log(data);
    fs.writeFile('./coursedata.json',JSON.stringify(data),(err,d)=>{
        res.send('Create operation is working');
    })
    
})

// dynamic routing
b.get('/read/:id',(req,res)=>{
    const userid=Number(req.params.id);
    const r=data.find((r)=>r.id===userid);
    res.send(r);
})

// update operation
b.patch('/upd/:id',(req,res)=>{
    const userid=Number(req.params.id);
    const r=data.find((r)=>r.id===userid);
    r.first_name='editedfirstname';
    r.last_name='editedlastname';
    fs.writeFile('./coursedata.json',JSON.stringify(data),(err,d)=>{
        res.send(data);
    })
})

// delete operation
b.delete('/del/:id',(req,res)=>{
    const userid=Number(req.params.id);
    const r=data.find((r)=>r.id===userid);
    const var1= delete data[userid-1];

    if(var1===true){
      fs.writeFile('./coursedata.json',JSON.stringify(data),(err,d)=>{
        res.json({success:"successdeleted",d:r})
      })  
    }
    else{
      res.send('Error in deleting the object');  
    }
    
    })


b.listen(port,()=>{
    console.log('Server started');
})