window.onload = function () {
    //解决低版本IE没有getElementsByClassName()的问题

    // if (!document.getElementsByClassName()) {
    //     document.getElementsByClassName = function (cls) {
    //         let tags = document.getElementsByTagName('*');
    //         let res = [];
    //         for (let i = 0; i < tags.length; i++) {
    //             if (tags[i].className === cls
    //                 || tags[i].className.indexOf(cls + ' ') >= 0
    //                 || tags[i].className.indexOf(' ' + cls + ' ') >= 0
    //                 || tags[i].className.indexOf(' ' + cls) >= 0) {
    //                 res.push(tags[i])
    //             }
    //         }
    //         return res
    //     }
    // }

    let cartTable = document.getElementById("cartTable")
    let tr = cartTable.children[1].rows
    let price = document.getElementsByClassName("price")
    let checkInputs = document.getElementsByClassName("check") //所有的选择框
    let checkAllInputs = document.getElementsByClassName("check-all") //两个全选框
    let selectedTotal = document.getElementById("selectedTotal")
    let priceTotal = document.getElementById("priceTotal")
    let selected = document.getElementById("selected")
    let foot = document.getElementById("foot")
    let selectedViewList = document.getElementById("selectedViewList")
    let subTotal = document.getElementsByClassName("subtotal")
    let delAll = document.getElementById("deleteAll")
    //计算总价格和总数量函数
    let getTotal = function () {
        let totalPrice = 0;
        let amount = 0;
        let HTMLstr = ""
        for (let i = 0; i < tr.length; i++) {
            if (tr[i].cells[0].getElementsByTagName("input")[0].checked) {
                tr[i].className = "on"
                HTMLstr += '<div><img src="' + tr[i].getElementsByTagName("img")[0].src + '" alt=""><span index="' + i + '" class="del"></span></div>'
                totalPrice += parseFloat(subTotal[i].innerHTML)
                amount += parseInt(tr[i].getElementsByTagName("input")[1].value)
            } else {
                tr[i].className = ""
            }
        }
        selectedViewList.innerHTML = HTMLstr
        selectedTotal.innerHTML = amount.toString()
        priceTotal.innerHTML = totalPrice.toFixed(2)
    }

    //小计：计算每一行的价格
    let getSubTotal = function (tr) {
        let tds = tr.cells
        let subtotal
        subtotal = parseFloat(tds[2].innerHTML) * tds[3].getElementsByTagName("input")[0].value
        tds[4].innerHTML = subtotal.toFixed(2)
    }
    for (let i = 0; i < checkInputs.length; i++) {
        checkInputs[i].onclick = function () {
            if (this.className === 'check-all check') {
                for (let i = 0; i < checkInputs.length; i++) {
                    checkInputs[i].checked = this.checked
                }
            }
            if (this.checked === false) {
                for (let i = 0; i < checkAllInputs.length; i++) {
                    checkAllInputs[i].checked = false
                }
            }
            getTotal()
        }

    }
    selected.onclick = function () {
        if (foot.className === "foot") {
            if (selectedTotal.innerHTML !== '0') {
                foot.className = "foot show"
                console.log(1)
            }

        } else {
            foot.className = "foot"
        }
    }
    selectedViewList.onclick = function (e) {
        let el = e.target;
        if (el.className === "del") {
            let index = el.getAttribute("index")
            let input = tr[index].getElementsByTagName("input")[0];
            input.checked = false
            input.onclick()

        }

    }
    delAll.onclick = function () {
        if (selectedTotal.innerHTML !== "0") {
            let con = confirm("确定要删除吗")
            if (con) {
                for (let i = 0; i < tr.length; i++) {
                    if (tr[i].getElementsByClassName("check-one")[0].checked) {
                        tr[i].parentNode.removeChild(tr[i])
                        i--
                    }
                }
            }
        }
    }
    for (let i = 0; i < tr.length; i++) {
        let input = tr[i].getElementsByClassName("count-input")[0]
        let del = tr[i].getElementsByClassName("delete")[0]
        let changeAmount = tr[i].getElementsByClassName("count")[0]

        tr[i].onclick = function (e) {
            let del = this.getElementsByClassName("delete")[0]
            let reduce = this.getElementsByClassName("reduce")[0]
            let count = this.getElementsByClassName("count-input")[0].value
            if (e.target.className === "reduce") {
                if (count > 1) {
                    count -= 1
                    tr[i].getElementsByClassName("count-input")[0].value = count
                }
                getSubTotal(tr[i])
                if (count === 1) {
                    reduce.innerHTML = ""
                }
            }
            if (e.target.className === "add") {
                count = parseInt(count) + 1
                reduce.innerHTML = "-"
                this.getElementsByClassName("count-input")[0].value = count
                getSubTotal(this)
            }
            del.onclick = function () {
                let con = confirm("确定要删除吗")
                if (con) {
                    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)
                    getTotal()
                }
            }
            getTotal()
        }
        input.onchange = function () {
            let value = this.value
            if (value < 1 || isNaN(value)) {
                this.value = 1
            }
            if (value === 1) {
                this.parentNode.parentNode.children[0].innerHTML = ""
            } else {
                this.parentNode.parentNode.children[0].innerHTML = "-"
            }
            getSubTotal(this.parentNode.parentNode.parentNode)
            getTotal()
        }

    }
}


var lengthOfLongestSubstring = function (s) {
    let arr = [];
    let res = [];

    for (i = 0; i < s.length; i++) {
        if (arr.indexOf(s[i]) >= 0) {
            res.push(arr.length)
            arr.splice(0, arr.indexOf(s[i]) + 1)
            arr.push(s[i])
        } else {
            arr.push(s[i])
        }
    }
    return Math.max(...res)

};

var longestPalindrome = function (s) {
    let dp = [];
    let maxLen = 1;
    let maxLenI = 0;
    let maxLenJ = 0;
    for (i = 0; i < s.length; i++) {
        dp[i] = []
        for (j = i; j < s.length; j++) {
            if (j === i) {
                dp[i][j] = true
            } else if (j === i + 1) {
                if (s[i] === s[j]) {
                    dp[i][j] = true
                }
            } else {
                if (dp[i - 1][j + 1] && (s[i] === s[j])) {
                    dp[i][j] = true
                    if ((j - i + 1) > maxLen) {
                        maxLen = j - i + 1;
                        maxLenI = i;
                        maxLenJ = j
                    }
                }
            }
        }
    }
    return s.slice(maxLenI, maxLenJ + 1)
};
