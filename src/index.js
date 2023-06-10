// TODO: 이 곳에 정답 코드를 작성해주세요.
/* 
1. Autofocus
페이지가 로드된 시점에 ID 입력 창에 Focus가 되어 있어야 합니다.

대상: ID 입력(input)
시점: 페이지(window)가 로드 되었을 때
이벤트: focus()
*/

const $id = document.getElementById('id');
// window가 로드되었을 때 id가 focus
window.addEventListener('load', () => {$id.focus();})


// $id.focus();
// $id.focus();
