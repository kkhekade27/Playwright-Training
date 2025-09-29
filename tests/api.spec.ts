import { test, expect } from '@playwright/test';

//  Get call

test ('GET',async({request})=>{

  const requestUrl = 'https://api.restful-api.dev/objects';

  const  getresponse = await request.get(requestUrl);

  console.log(await getresponse.json())

  expect(getresponse.ok()).toBeTruthy();

  expect(getresponse.status()).toBe(200);
  

   // Post Call
   
  const postpayload = {
                            "name": "Samsung Pro 16",
                            "data": {
                                        "year": 2025,
                                        "price": 15000,
                                        "CPU model": "Intel Core i12",
                                        "Hard disk size": "3 TB"
                                    }
                        }

  const  postresponse = await request.post(requestUrl,{data: postpayload});

  console.log(await postresponse.json());

  expect(postresponse.ok()).toBeTruthy();

  expect(postresponse.status()).toBe(200);

  const json = await postresponse.json();

  const ID = await json.id;

// PUT call

 const newendpoint = `https://api.restful-api.dev/objects/${ID}`;

 const putpayload = {
                    "name": "Apple MacBook Pro 16",
                    "data": {
                        "year": 2025,
                        "price": 20000,
                        "CPU model": "Intel Core i12",
                        "Hard disk size": "1 TB"
                            }
                  }

  const  putresponse = await request.put(newendpoint,{data: putpayload});

  console.log(await putresponse.json());

  expect(putresponse.ok()).toBeTruthy();

  expect(putresponse.status()).toBe(200);

  // Patch Call
  
   const patchpayload = {
                    "name": "Apple MacBook 17",
                    "data": {
                        "year": '2020',
                        
                            }
                  }
  const  patchresponse = await request.patch(newendpoint,{data: patchpayload});
  console.log(await patchresponse.json());
  expect(patchresponse.ok()).toBeTruthy();

  expect(patchresponse.status()).toBe(200);

  // Delete call
 
  const  deleteresponse = await request.delete(newendpoint);
  console.log(await deleteresponse.json());
  expect(deleteresponse.ok()).toBeTruthy();
  expect(deleteresponse.status()).toBe(200);

  //get response to verify that deleted data is not present

  const  getdeletedresponse = await request.get(newendpoint);

  expect(getdeletedresponse.ok()).toBeFalsy();

  });