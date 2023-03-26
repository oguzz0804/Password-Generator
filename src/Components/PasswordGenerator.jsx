import React, { useState, useEffect } from 'react'
import './PasswordGenerator.css'
import Icon from '../assets/copy-icon.svg'
import { ToastContainer, toast } from 'react-toastify'

const lowercaseList = "abcdefghijklmnopqrstuvwxyz"
const uppercaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numberList = "0123456789"
const symbolList = "!@#$%^&*()?"

const PasswordGenerator = () => {
    const [password, setPassword] = useState("")
    const [lowerCase, setLowerCase] = useState(true)
    const [upperCase, setUpperCase] = useState(true)
    const [numbers, setNumbers] = useState(true)
    const [symbols, setSymbols] = useState(true)
    const [passwordLength, setPasswordLength] = useState(6)
    const [selectedBox, setSelectedBox] = useState(["lowercase", "uppercase", "numbers", "symbols"])

    useEffect(() => {
        generatePassword()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [passwordLength])

    const handleCheckbox = (type) => {
        let tempChoices = selectedBox
        if (tempChoices.includes(type)) {
            const index = tempChoices.indexOf(type)
            tempChoices.splice(index, 1)
        }
        else {
            tempChoices.push(type)
        }
        /* console.log(tempChoices) */
        setSelectedBox(tempChoices)
    }

    const generatePassword = () => {
        let characterList = "";

        if (lowerCase) {
            characterList += lowercaseList
        }
        if (upperCase) {
            characterList += uppercaseList
        }
        if (numbers) {
            characterList += numberList
        }
        if (symbols) {
            characterList += symbolList
        }

        let tempPassword = ""
        const characterListLength = characterList.length

        for (let i = 0; i < passwordLength; i++) {
            const characterIndex = Math.round(Math.random() * characterListLength)
            tempPassword += characterList.charAt(characterIndex)
        }
        setPassword(tempPassword)
    }

    const copyPassword = async () => {
        const copiedText = await navigator.clipboard.readText()
        if (password.length && copiedText !== password) {
            navigator.clipboard.writeText(password)
            toast.success('Password Copied to Clipboard', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <>
            <div className="password__container">
                <h2 className="password__title">Password Generator</h2>
                <div className="password__wrapper">
                    <div className="password__area">
                        <div className="password">
                            <input type="text" value={password} disabled placeholder="Click Generate Password" />
                            <img src={Icon} alt="icon" className="password__icon" onClick={copyPassword} />
                        </div>
                    </div>
                </div>
                <div className="password__setting">
                    <h3>Customize Password</h3>
                    <div className="password__customize">

                        <div className="password__checkboxes">
                            <div className="left">
                                <div className="password__checkbox-field">
                                    <input type="checkbox" name="lower" id="lower" checked={lowerCase} disabled={selectedBox.length === 1 && selectedBox.includes("lowercase")} onChange={() => { setLowerCase(!lowerCase); handleCheckbox("lowercase") }} />
                                    <label htmlFor="lower">Include LowerCase[a-z]</label>
                                </div>

                                <div className="password__checkbox-field">
                                    <input type="checkbox" name="upper" id="upper" checked={upperCase} disabled={selectedBox.length === 1 && selectedBox.includes("uppercase")} onChange={() => { setUpperCase(!upperCase); handleCheckbox("uppercase") }} />
                                    <label htmlFor="upper">Include UpperCase[A-Z]</label>
                                </div>
                            </div>

                            <div className="right">
                                <div className="password__checkbox-field">
                                    <input type="checkbox" name="numbers" id="numbers" checked={numbers} disabled={selectedBox.length === 1 && selectedBox.includes("numbers")} onChange={() => { setNumbers(!numbers); handleCheckbox("numbers") }} />
                                    <label htmlFor="numbers">Include Numbers[0-9]</label>
                                </div>

                                <div className="password__checkbox-field">
                                    <input type="checkbox" name="symbols" id="symbols" checked={symbols} disabled={selectedBox.length === 1 && selectedBox.includes("symbols")} onChange={() => { setSymbols(!symbols); handleCheckbox("symbols") }} />
                                    <label htmlFor="symbols">Include Symbols[&-#]</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="password__length">
                    <h3>Password Length</h3>
                    <div className="password__slider">
                        <p className="password__rangeValue">{passwordLength}</p>
                        <div className="password__range">
                            <input type="range" min={6} max={40} defaultValue={passwordLength} onChange={(event) => setPasswordLength(event.currentTarget.value)} />
                        </div>
                    </div>
                </div>

                <div className="password__button">
                    <button type="button" onClick={copyPassword}>Copy Password</button>
                    <button type="button" onClick={generatePassword}>Generate Password</button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default PasswordGenerator