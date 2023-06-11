// TODO: 이 곳에 정답 코드를 작성해주세요.
/* 
1. Autofocus
페이지가 로드된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.

대상: ID 입력(input)
이벤트: 페이지(window)가 로드 되었을 때
핸들러: focus()

다른 방법: input tag의 'autofocus'속성 사용
*/

const $id = document.getElementById('id')
// window가 로드되었을 때 id가 focus
window.addEventListener('load', () => {
    $id.focus()
})

/* 
2. 유효성 검사 로직
ID, 비밀번호, 비밀번호 확인 필드에 대한 유효성 검사를 수행해야 합니다.
 
대상: ID, 비밀번호, 비밀번호 확인 Input
이벤트: (1) input focus out 시, (2) 가입하기 버튼을 눌렀을 때 
핸들러: (1)  해당 input의 유효성을 검사, (2) 모든 필드의 유효성을 검사

3. 커스텀 에러 메세지
유효하지 않은 값일 경우, 각 경우에 맞는 에러 메시지를 보여주어야 합니다.
*/

const $pw = document.getElementById('pw')
const $pwCheck = document.getElementById('pw-check')
const $idMsg = document.getElementById('id-msg')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheckMsg = document.getElementById('pw-check-msg')

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')
const ERROR_MSG = {
    required: '필수 정보입니다.',
    invalidId:
        '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    invalidPw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    invalidPwCheck: '비밀번호가 일치하지 않습니다.',
    null: '',
}

let [isValidId, isValidPw, isValidPwCheck] = [false, false, false]

function selectInvalidMsg(target) {
    const { value, id } = target
    if (value === '') {
        return 'required'
    } else {
        switch (id) {
            case 'id':
                return ID_REGEX.test(value) ? 'null' : 'invalidId'
            case 'pw':
                return PW_REGEX.test(value) ? 'null' : 'invalidPw'
            case 'pw-check':
                return value === $pw.value ? 'null' : 'invalidPwCheck'
        }
    }
}
function changeIsValidFlag(target, flag) {
    const id = target.id
    if (id === 'id') {
        isValidId = flag
    } else if (id === 'pw') {
        isValidPw = flag
    } else if (id === 'pw-check') {
        isValidPwCheck = flag
    }
}
function checkIsValid(target, targetMsg) {
    const invalidMsg = selectInvalidMsg(target)
    if (invalidMsg === 'null') {
        changeIsValidFlag(target, true)
        target.classList.remove('border-red-600')
        targetMsg.textContent = ERROR_MSG[invalidMsg]
    } else {
        changeIsValidFlag(target, false)
        target.classList.add('border-red-600')
        targetMsg.textContent = ERROR_MSG[invalidMsg]
    }
}

function checkIsValidId() {
    checkIsValid($id, $idMsg)
    checkValidationSubmit()
}
function checkIsValidPw() {
    checkIsValid($pw, $pwMsg)
    checkValidationSubmit()
}
function checkIsValidPwCheck() {
    checkIsValid($pwCheck, $pwCheckMsg)
    checkValidationSubmit()
}

$id.addEventListener('focusout', () => {
    checkIsValidId()
})
$pw.addEventListener('focusout', () => {
    checkIsValidPw()
})
$pwCheck.addEventListener('focusout', () => {
    checkIsValidPwCheck()
})

const $submit = document.getElementById('submit')
$submit.disabled = true
function checkValidationSubmit() {
    $submit.disabled = isValidId && isValidPw && isValidPwCheck ? false : true
}

/* 
4. 입력 확인 모달 창
제출하기 버튼 클릭 시, 모든 input의 값이 유효한 상태일 경우 
입력한 아이디와 비밀번호를 확인할 수 있는 모달 창을 보여주어야 합니다.
*/

const $form = document.getElementById('form')
const $dialog = document.getElementById('modal')
const $modalId = document.getElementById('confirm-id')
const $modalPw = document.getElementById('confirm-pw')

$form.addEventListener('submit', (event) => {
    event.preventDefault()
    $modalId.textContent = $id.value
    $modalPw.textContent = $pw.value
    $dialog.showModal()
})

const $approveBtn = document.getElementById('approve-btn')
const $cancelBtn = document.getElementById('cancel-btn')

function resetForm() {
    ;[isValidId, isValidPw, isValidPwCheck] = [false, false, false]
    $id.value = ''
    $pw.value = ''
    $pwCheck.value = ''
}

$approveBtn.addEventListener('click', () => {
    alert('가입되었습니다 🥳 ~!')
    $dialog.close()
    resetForm()
})

$cancelBtn.addEventListener('click', () => {
    $dialog.close()
})

/*
5. 폰트 사이즈 조절 버튼
회원가입 폼에 사용된 기본 폰트 사이즈는 16px입니다.
기본 폰트 사이즈를 기준으로 1px씩 폰트 사이즈를 조절할 수 있는 기능을 구현해주세요.
*/

const $increaseFontBtn = document.getElementById('increase-font-btn')
const $decreaseFontBtn = document.getElementById('decrease-font-btn')
const $html = document.documentElement
//  document.querySelector('html') 과 동일함

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

$increaseFontBtn.addEventListener('click', () => {
    onClickfontSizeControl('increase')
})
$decreaseFontBtn.addEventListener('click', () => {
    onClickfontSizeControl('decrease')
})
const onClickfontSizeControl = (flag) => {
    const fontSize = parseInt(window.getComputedStyle($html).fontSize)
    const nextFontSize = flag === 'increase' ? fontSize + 1 : fontSize - 1
    $html.style.fontSize = nextFontSize
    $increaseFontBtn.disabled = nextFontSize >= MAX_FONT_SIZE
    $decreaseFontBtn.disabled = nextFontSize <= MIN_FONT_SIZE
}
