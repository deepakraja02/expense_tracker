$(function () {
    if (!localStorage.getItem("expenses")) {

        localStorage.setItem("expenses", JSON.stringify([]));
    }
    
   
     window.getdata = function() {
        $("#retrive_data").empty();
       
        var getdata_local = JSON.parse(localStorage.getItem("expenses"));
        if ((getdata_local).length >= 1) {
            let index = 0;
            $.each(getdata_local, function (indexInArray, valueOfElement) {
                index = index + 1;
                
                let query = `<tr id="${valueOfElement.id}">
                    <td>${indexInArray+1}</td>
                    <td>${valueOfElement.name}</td>
                    <td>${valueOfElement.amount}</td>
                    <td>${valueOfElement.local_date}</td>
                    <td>${valueOfElement.category}</td>
                    <td>
                    <button class="btn btn-danger" onclick="delete_element(${valueOfElement.id})">Delete</button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal" onclick="edit_element(${valueOfElement.id})">Edit</button>
                    </td>
                </tr>`;
                $(query).appendTo("#retrive_data");
            });
        }

    }
    

    getdata();
  
   

    $("#form").on("submit", function (event) {
        
        var expense = $("#expense").val();
        var amount = $("#amount").val();
        var category = $("#category").val();

        let newobj = {
            id:Date.now(),
            name: expense,
            amount: parseFloat(amount),
            category: category,
            local_date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
        }
        let expense_data = JSON.parse(localStorage.getItem("expenses"));
        expense_data.push(newobj)
        localStorage.setItem("expenses", JSON.stringify(expense_data));

        expense.empty();
        amount.empty();
        category.val("other");
        event.preventDefault();
        getdata();

    });

    $("#update_form").on("submit", function (event){
        
        let localstorage_data=JSON.parse(localStorage.getItem("expenses")) || [];
        var expense = $("#expense_update").val();
        var amount = $("#amount_update").val();
        var category = $("#category_update").val();
        var local_date=$("#date_hidden").val();
        var id=$("#id_hidden").val();
        let updatedobj = {
            id:id,
            name: expense,
            amount: amount,
            category: category,
            local_date:local_date
        }
  
       localstorage_data=$.map(localstorage_data, function (elementOrValue) {
            
            
            return elementOrValue.id==id ? {...updatedobj,id:elementOrValue.id} : elementOrValue;
       });
       console.log(localstorage_data);
       
       localStorage.setItem("expenses",JSON.stringify(localstorage_data));
       getdata();
       $('.success_class').show(300).delay(7000).fadeOut(1000);
       $('#close_button').trigger('click');
       event.preventDefault();


    });


})
function delete_element(id)
{
    let a=confirm("Are you sure?");
    if(a)
    {
        let localstorage_data=JSON.parse(localStorage.getItem("expenses"));
        let deleted_data=localstorage_data.filter(exp => exp.id !== id);
        
        
        localStorage.setItem("expenses",JSON.stringify(deleted_data));
        $('.danger_class').show(300).delay(7000).fadeOut(1000);
        getdata();
        
        
    }
    else
    {
        console.log("User not ok with that");
        
    }
    
}
function edit_element(id){
    let localstorage_data=JSON.parse(localStorage.getItem("expenses"));
    let get_edit_data=localstorage_data.find(exp=> exp.id===id);
    $(`#id_hidden`).val(get_edit_data.id);
    $(`#expense_update`).val(get_edit_data.name);
    $(`#amount_update`).val(get_edit_data.amount);
    $(`#category_update`).val(get_edit_data.category);
    $(`#date_hidden`).val(get_edit_data.local_date);
    console.log(get_edit_data);
    
}

