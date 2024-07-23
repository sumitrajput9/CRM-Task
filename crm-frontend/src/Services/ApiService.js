import axios from "axios";
export function addLeadApi(data){
     return axios.post("http://localhost:4000/api/leads" ,data);
}
export function getLeadsApi(){
    return axios.get("http://localhost:4000/api/leads");
}
export function updateLeadApi(id,data){
    console.log(data)
    return axios.put(`http://localhost:4000/api/leads/update/${id}`,{ data }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }