const userModel = require('../models/user.model');

// get list account
exports.generateAccountList = (req, res)=>{
    let typeAccount = req.query.type || '';
    let headerPage;
    let statusAccount = req.query.status || 1;
    let option;
    if(typeAccount.localeCompare("admin") === 0){
        option = {isAdmin: true, 'info.status': statusAccount};
        headerPage = 'List of admin';
    }
    if(typeAccount.localeCompare("doctor") === 0){
        option = {isDoctor: true, 'info.status': statusAccount};
        headerPage = 'List of doctors';
    }
    if(typeAccount.localeCompare("user") === 0){
        option = {isDoctor: false, isAdmin: false, 'info.status': statusAccount};
        headerPage = 'List of users';
    }
    let page = req.query.page || 1;
    let limit = req.query.limit || 2;
    userModel.find(option).paginate(parseInt(page), parseInt(limit), function(err, list, total) {
        if(err){
            //handle err
            res.send(err)
        }
        // paginate info
        let statusPrevious = "";
        let statusNext = "";
        let totalPage = Math.ceil(total/limit);
        let endRecord = (page -1)*limit + parseInt(limit);
        let startRecord = (page - 1)*limit + 1;
        let previousPage = 1;
        let nextPage = totalPage;
        let endPage = totalPage;
        let startPage = 1;

        if(page > 1){ previousPage = page - 1;}
        if(page < totalPage){ nextPage = parseInt(page) + 1;}
        if(page === 1){ statusPrevious = "disabled";}
        if (page === totalPage){
            statusNext = "disabled";
            endRecord = total;
        }
        if(page >= 3){startPage = page - 2;}
        if(page <= totalPage - 2){endPage = parseInt(page) + 2;}
        if(total === 0){
            endRecord = 0;
            startRecord = 0;
        }

        console.log(page);

        let paginateIfo = {
            statusPrevious: statusPrevious,
            statusNext: statusNext,
            endRecord: endRecord,
            startRecord: startRecord,
            previousPage: previousPage,
            nextPage: nextPage,
            endPage: endPage,
            startPage: startPage,
        };
        //end paginate info
        let resData = {
            list: list,
            total: total,
            // 'totalPage': Math.ceil(total/limit),
            totalPage: totalPage,
            page: page,
            limit: limit,
            headerPage: headerPage,
            paginateIfo: paginateIfo
        };
        res.render('admin/accountList', resData);
    })
};