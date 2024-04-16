import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./ManageAccount.module.scss";
import { apiGetAllCustomerInfo, apiDeleteCustomerAccountById, apiModifyCustomerAccount, apiGetAccountByPhone, apiCreateAccountForAnotherAdmin } from "../../../../services/user";
import { IoPersonAddOutline } from "react-icons/io5";
import { Button, Label, TextInput } from "flowbite-react";
import { Alert } from "flowbite-react";
import { Pagination } from "flowbite-react";

function ManageAccount() {
    const [customerInfo, setCustomerInfo] = useState([]); // ARRAY TO STORE CUSTOMER DATA
    const [isFetchedData, setIsFetchedData] = useState(false); // FLAG TO CHECK IS FETCHED CUSTOMER DATA

    // SET UP PAGINATION
    const [totalPage, setTotalPage] = useState();
    const [isTotalPageSet, setIsTotalPageSet] = useState(false);
    const quantityItemsPerpage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const lastIndex = currentPage * quantityItemsPerpage;
    const firstIndex = lastIndex - quantityItemsPerpage;
    const displayedCustomers = customerInfo.slice(firstIndex, lastIndex);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    }

    console.log(currentPage);

    const [isVisibleAlertSuccess, setIsVisibleAlertSuccess] = useState(false); // FLAG TO CHECK IS VISIBLE ALERT SUCCESS

    const [isVisibleAddNewAccountForm, setIsVisibleAddNewAccountForm] = useState(false); // FLAG TO CHECK CLICK ON ADD NEW ACCOUNT BUTTON

    const [isVisibleConfirmDeleteAccountWindow, setIsVisibleConfirmDeleteAccountWindow] = useState(false); // FLAG TO CHECK CLICK ON DELETE ACCOUNT BUTTON
    const [deleteId, setDeleteId] = useState(null); // VARIABLE TO STORE ID OF CUSTOMER ACCOUNT WILL BE DELETED

    const [isVisibleFormModifyAccount, setIsVisibleFormModifyAccount] = useState(false); // FLAG TO CHECK CLICK ON MODIFY ACCOUNT BUTTON
    const [modifyId, setModifyId] = useState(null); // VARIABLE TO STORE ID OF CUSTOMER ACCOUNT WILL BE MODIFIED

    const [newNameInModifyForm, setNewNameInModifyForm] = useState(""); // VARIABLE TO STORE NAME IN FORM MODIFY ACCOUNT
    const [newPasswordInModifyForm, setNewPasswordInModifyForm] = useState(""); // VARIABLE TO STORE PASSWORD IN FORM MODIFY ACCOUNT
    const [newEmailInModifyForm, setNewEmailInModifyForm] = useState(""); // VARIABLE TO STORE EMAIL IN FORM MODIFY ACCOUNT

    const [errorForNameInModifyForm, setErrorForNameInModifyForm] = useState(false); // FLAG TO CHECK ERROR FOR NAME IN MODIFY ACCOUNT FORM
    const [errorForPasswordInModifyForm, setErrorForPasswordInModifyForm] = useState(false); // FLAG TO CHECK ERROR FOR PASSWORD IN MODIFY ACCOUNT FORM
    const [errorForEmailInModifyForm, setErrorForEmailInModifyForm] = useState(false); // FLAG TO CHECK ERROR FOR EMAIL IN MODIFY ACCOUNT FORM

    const [nameInAddAccountForm, setNameInAddAccountForm] = useState(""); // VARIABLE TO STORE NAME IN FORM ADD ACCOUNT
    const [phoneInAddAccountForm, setPhoneInAddAccountForm] = useState(""); // VARIABLE TO STORE PHONE IN FORM ADD ACCOUNT
    const [emailInAddAccountForm, setEmailInAddAccountForm] = useState(""); // VARIABLE TO STORE EMAIL IN FORM ADD ACCOUNT
    const [passwordInAddAccountForm, setPasswordInAddAccountForm] = useState(""); // VARIABLE TO STORE PASSWORD IN FORM ADD ACCOUNT

    const [errorForNameInAddAccountForm, setErrorForNameInAddAccountForm] = useState(false); // FLAG TO CHECK ERROR FOR NAME IN ADD ACCOUNT FORM
    const [errorForPhoneInAddAccountForm, setErrorForPhoneInAddAccountForm] = useState(false); // FLAG TO CHECK ERROR FOR PHONE IN ADD ACCOUNT FORM
    const [errorForEmailInAddAccountForm, setErrorForEmailInAddAccountForm] = useState(false); // FLAG TO CHECK ERROR FOR EMAIL IN ADD ACCOUNT FORM
    const [errorForPasswordInAddAccountForm, setErrorForPasswordInAddAccountForm] = useState(false); // FLAG TO CHECK ERROR FOR PASSWORD IN ADD ACCOUNT FORM

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // EMAIL PATTERN

    // HANDLE GET CUSTOMER DATA FROM BACKEND
    const handleGetData = async () => {
        try {
            const response = await apiGetAllCustomerInfo();
            setCustomerInfo(response.data.response);
            setIsFetchedData(true);
            console.log(response.data.response.length);
        }
        catch (err) {
            console.log(err);
        }
    }

    // GET CUSTOMER ACCOUNT DATA
    useEffect(() => {
        handleGetData();
    }, [isFetchedData, currentPage]);

    // SET TOTAL PAGE
    useEffect(() => {
        if (customerInfo.length > 0) {
            if (customerInfo.length % 10 === 0) {
                setTotalPage(parseInt(customerInfo.length / 10));
            } else {
                setTotalPage(parseInt(customerInfo.length / 10 + 1));
            }
            setIsTotalPageSet(true);
        }
    }, [customerInfo]);

    // HANDLE WHEN CLICK ADD NEW ACCOUNT
    const handleVisibleFormAddNewAccount = () => {
        setIsVisibleAddNewAccountForm(true);
    }

    // HANDLE WHEN CLICK MODIFY ACCOUNT
    const handleVisibleFormModifyAccount = (id) => {
        setModifyId(id)
        setIsVisibleFormModifyAccount(true);
    }

    // HANDLE WHEN CLICK DELETE ACCOUNT
    const handleDeleteCustomerAccountById = async (id) => {
        setDeleteId(id);
        setIsVisibleConfirmDeleteAccountWindow(true);
    }

    // HANDLE WHEN CLICK CONFIRM DELETE ACCOUNT
    const confirmDelete = async () => {
        try {
            await apiDeleteCustomerAccountById(deleteId);
            setCustomerInfo(prevCustomerInfo => prevCustomerInfo.filter(customer => customer.id !== deleteId));
        } catch (error) {
            console.log(error);
        }
        setIsVisibleConfirmDeleteAccountWindow(false);
        setIsVisibleAlertSuccess(true);
        setTimeout(() => {
            setIsVisibleAlertSuccess(false);
        }, 500);
    }

    // HANDLE SUBMIT MODIFY ACCOUNT FORM
    const handleSubmitFormModifyAccount = async (event) => {
        event.preventDefault();

        let hasError = false;

        if (newNameInModifyForm === "") {
            setErrorForNameInModifyForm(true);
            hasError = true;
        } else {
            setErrorForNameInModifyForm(false);
        }

        if (newPasswordInModifyForm.length < 6 || newPasswordInModifyForm === "") {
            setErrorForPasswordInModifyForm(true);
            hasError = true;
        } else {
            setErrorForPasswordInModifyForm(false);
        }

        if (!emailPattern.test(newEmailInModifyForm)) {
            setErrorForEmailInModifyForm(true);
            hasError = true;
        } else {
            setErrorForEmailInModifyForm(false);
        }

        if (hasError) {
            setErrorForNameInModifyForm(true);
            setErrorForPasswordInModifyForm(true);
            setErrorForEmailInModifyForm(true);
        } else {
            const payload = {
                id: modifyId,
                accountName: newNameInModifyForm,
                accountPassword: newPasswordInModifyForm,
                accountEmail: newEmailInModifyForm
            };
            await apiModifyCustomerAccount(payload);

            const updatedCustomerInfo = customerInfo.map(customer => {
                if (customer.id === modifyId) {
                    return {
                        ...customer,
                        accountName: newNameInModifyForm,
                        accountPassword: newPasswordInModifyForm,
                        accountEmail: newEmailInModifyForm
                    };
                }
                return customer;
            });
            setCustomerInfo(updatedCustomerInfo);

            setTimeout(() => {
                setIsVisibleFormModifyAccount(false);
            }, 200)

            setNewNameInModifyForm("");
            setNewPasswordInModifyForm("");
            setNewEmailInModifyForm("");
            setErrorForNameInModifyForm(false);
            setErrorForPasswordInModifyForm(false);
            setErrorForEmailInModifyForm(false);
        }
    }

    // HANDLE SUBMIT ADD ACCOUNT FORM
    const handleSubmitFormAddAccount = async (event) => {
        event.preventDefault();

        let hasError = false;

        if (nameInAddAccountForm === "") {
            setErrorForNameInAddAccountForm(true);
            hasError = true;
        } else {
            setErrorForNameInAddAccountForm(false);
        }

        if (passwordInAddAccountForm.length < 6) {
            setErrorForPasswordInAddAccountForm(true);
            hasError = true;
        } else {
            setErrorForPasswordInAddAccountForm(false);
        }

        if (phoneInAddAccountForm.length !== 10 || phoneInAddAccountForm[0] !== '0') {
            setErrorForPhoneInAddAccountForm(true);
            hasError = true;
        } else {
            setErrorForPhoneInAddAccountForm(false);
        }

        if (!emailPattern.test(emailInAddAccountForm) || emailInAddAccountForm === "") {
            setErrorForEmailInAddAccountForm(true);
            hasError = true;
        } else {
            setErrorForEmailInAddAccountForm(false);
        }

        if (hasError) {
            setErrorForNameInAddAccountForm(true);
            setErrorForPasswordInAddAccountForm(true);
            setErrorForPhoneInAddAccountForm(true);
            setErrorForEmailInAddAccountForm(true);
        } else {
            const payload = {
                accountName: nameInAddAccountForm,
                accountPassword: passwordInAddAccountForm,
                accountPhone: phoneInAddAccountForm,
                accountEmail: emailInAddAccountForm,
                accountType: 'ADMIN'
            };

            const response = await apiGetAccountByPhone(payload.accountPhone);

            if (response.data.msg === "Your phone is duplicate") {
                setErrorForPhoneInAddAccountForm(true);
                hasError = true;
            } else {
                await apiCreateAccountForAnotherAdmin(payload);

                setTimeout(() => {
                    setIsVisibleAddNewAccountForm(false);
                }, 200);

                setNameInAddAccountForm("");
                setPasswordInAddAccountForm("");
                setPhoneInAddAccountForm("");
                setEmailInAddAccountForm("");
            }
        }
    }

    return (
        <div className={clsx(style.container)}>
            {/* ALERT SUCCESS */}
            {isVisibleAlertSuccess && (
                <div className={clsx(style["alert-container"])}>
                    <Alert color="success">
                        <span className="font-medium">Success!</span>
                    </Alert>
                </div>
            )}

            {/* CONFIRM DELETE ACCOUNT WINDOW */}
            {isVisibleConfirmDeleteAccountWindow && (
                <div className={clsx(style["confirm-delete-window"])} data-aos="flip-up">
                    <h2>Are you sure you want to delete this account?</h2>
                    <div className={clsx(style["button-confirm-window"])}>
                        <button
                            id={clsx(style["confirm-delete-account-button"])}
                            onClick={confirmDelete}
                        >
                            Confirm
                        </button>
                        <button
                            id={clsx(style["cancel-delete-account-button"])}
                            onClick={() => setIsVisibleConfirmDeleteAccountWindow(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* BUTTON ADD NEW ACCOUNT */}
            <div
                className={clsx(style["add-new-account-button-container"])}
                onClick={handleVisibleFormAddNewAccount}
            >
                <Button color="success" className={clsx(style["add-new-account-button"])}>
                    <IoPersonAddOutline className="mr-2 h-5 w-5" />
                    Add New Account
                </Button>
            </div>

            {/* ADD NEW ACCOUNT FORM */}
            {isVisibleAddNewAccountForm && (
                <div className={clsx(style["form-add-new-container"])}>
                    <form className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Enter your name" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                required
                                shadow
                                value={nameInAddAccountForm}
                                onChange={(e) => setNameInAddAccountForm(e.target.value)}
                                onClick={() => { setErrorForNameInAddAccountForm(false) }}
                            />
                            <div
                                className={clsx(style["error-message"])}
                                id={clsx(
                                    !errorForNameInAddAccountForm ? style["error-for-name-hidden"] : style[""]
                                )}
                            >
                                Your name is invalid
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Enter your password" />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                required
                                shadow
                                value={passwordInAddAccountForm}
                                onChange={(e) => setPasswordInAddAccountForm(e.target.value)}
                                onClick={() => { setErrorForPasswordInAddAccountForm(false) }}
                            />
                            <div
                                className={clsx(style["error-message"])}
                                id={clsx(
                                    !errorForPasswordInAddAccountForm ? style["error-for-password-hidden"] : style[""]
                                )}
                            >
                                Your password is invalid
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="phone" value="Enter your phone" />
                            </div>
                            <TextInput
                                id="phone"
                                type="text"
                                placeholder=""
                                required
                                shadow
                                value={phoneInAddAccountForm}
                                onChange={(e) => setPhoneInAddAccountForm(e.target.value)}
                                onClick={() => { setErrorForPhoneInAddAccountForm(false) }}
                            />
                            <div
                                className={clsx(style["error-message"])}
                                id={clsx(
                                    !errorForPhoneInAddAccountForm ? style["error-for-phone-hidden"] : style[""]
                                )}
                            >
                                Your phone is invalid or duplicate. Please try again
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Enter your email" />
                            </div>
                            <TextInput
                                id="email"
                                type="email"
                                placeholder="name@gmail.com"
                                required
                                shadow
                                value={emailInAddAccountForm}
                                onChange={(e) => setEmailInAddAccountForm(e.target.value)}
                                onClick={() => { setErrorForEmailInAddAccountForm(false) }}
                            />
                            <div
                                className={clsx(style["error-message"])}
                                id={clsx(
                                    !errorForEmailInAddAccountForm ? style["error-for-email-hidden"] : style[""]
                                )}
                            >
                                Your email is invalid
                            </div>
                        </div>
                        <div className={clsx(style["button-container"])}>
                            <button
                                id={clsx(style["submit-button"])}
                                onClick={handleSubmitFormAddAccount}
                            >
                                Submit
                            </button>
                            <button
                                id={clsx(style["cancel-button"])}
                                onClick={() => {
                                    setIsVisibleAddNewAccountForm(false);

                                    setNameInAddAccountForm("");
                                    setPasswordInAddAccountForm("");
                                    setPhoneInAddAccountForm("");
                                    setEmailInAddAccountForm("");

                                    setErrorForNameInAddAccountForm(false);
                                    setErrorForPasswordInAddAccountForm(false);
                                    setErrorForPhoneInAddAccountForm(false);
                                    setErrorForEmailInAddAccountForm(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* LIST ACCOUNT */}
            {displayedCustomers && displayedCustomers.length > 0 ? (
                displayedCustomers.map(customer => (
                    <div key={customer.id} className={clsx(style["sub-container"])}>
                        <div className={clsx(style["account-info-container"])}>
                            <div>
                                <label htmlFor="">Account Name: </label>
                                <span>{customer.accountName}</span>
                            </div>
                            <div>
                                <label htmlFor="">Account Phone: </label>
                                <span>{customer.accountPhone}</span>
                            </div>
                            <div>
                                <label htmlFor="">Account Email: </label>
                                <span>{customer.accountEmail}</span>
                            </div>
                        </div>
                        <div className={clsx(style["button-container"])}>
                            <button
                                id={clsx(style["modify-button"])}
                                onClick={() => handleVisibleFormModifyAccount(customer.id)}
                            >
                                Modify
                            </button>
                            <button
                                id={clsx(style["delete-button"])}
                                onClick={() => handleDeleteCustomerAccountById(customer.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div className={clsx(style["no-customer-case"])}>
                    The system currently has no customer
                </div>
            )}

            {/* PAGINATION */}
            {isTotalPageSet && customerInfo.length > 0 ? (
                <div className="flex overflow-x-auto sm:justify-center">
                    <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={onPageChange} />
                </div>
            ) : null}

            {/* FORM MODIFY ACCOUNT */}
            {isVisibleFormModifyAccount && (
                <div className={clsx(style["form-modify-container"])}>
                    <form className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="newName" value="Enter new name" />
                            </div>
                            <TextInput
                                id="newName"
                                type="text"
                                required
                                shadow
                                value={newNameInModifyForm}
                                onChange={(e) => setNewNameInModifyForm(e.target.value)}
                                onClick={() => { setErrorForNameInModifyForm(false) }}
                            />
                            <div
                                className={clsx(style["error-message"])}
                                id={clsx(
                                    !errorForNameInModifyForm ? style["error-for-name-hidden"] : style[""]
                                )}
                            >
                                Your name is invalid
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="newPassword" value="Enter new password" />
                            </div>
                            <TextInput
                                id="newPassword"
                                type="password"
                                required
                                shadow
                                value={newPasswordInModifyForm}
                                onChange={(e) => setNewPasswordInModifyForm(e.target.value)}
                                onClick={() => { setErrorForPasswordInModifyForm(false) }}
                            />
                            <div
                                className={clsx(style["error-message"])}
                                id={clsx(
                                    !errorForPasswordInModifyForm ? style["error-for-password-hidden"] : style[""]
                                )}
                            >
                                Your password is invalid
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="newEmail" value="Enter new email" />
                            </div>
                            <TextInput
                                id="newEmail"
                                type="email"
                                placeholder="name@gmail.com"
                                required
                                shadow
                                value={newEmailInModifyForm}
                                onChange={(e) => setNewEmailInModifyForm(e.target.value)}
                                onClick={() => { setErrorForEmailInModifyForm(false) }}
                            />
                            <div
                                className={clsx(style["error-message"])}
                                id={clsx(
                                    !errorForEmailInModifyForm ? style["error-for-email-hidden"] : style[""]
                                )}
                            >
                                Your email is invalid
                            </div>
                        </div>
                        <div className={clsx(style["button-container"])}>
                            <button
                                id={clsx(style["submit-button"])}
                                onClick={handleSubmitFormModifyAccount}
                            >
                                Submit
                            </button>
                            <button
                                id={clsx(style["cancel-button"])}
                                onClick={() => {
                                    setIsVisibleFormModifyAccount(false);
                                    setNewNameInModifyForm("");
                                    setNewPasswordInModifyForm("");
                                    setNewEmailInModifyForm("");
                                    setErrorForNameInModifyForm(false);
                                    setErrorForPasswordInModifyForm(false);
                                    setErrorForEmailInModifyForm(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ManageAccount;
