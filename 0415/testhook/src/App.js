// App.js
import Counter from './Counter';
import MyInput from './Textfield';
import MyCheckbox from './Checkbox'; // 파일명 Checkbox.js에서 가져옴
import Form from './Form';           // 파일명 Form.js에서 가져옴

function App() {
  return (
    <div style={{ padding: '20px', lineHeight: '1.6' }}>
      <h1>리액트 부품 상자 (Component Box)</h1>

      {/* 1. 입력창 컴포넌트 */}
      <section style={sectionStyle}>
        <h2>📝 텍스트 입력</h2>
        <MyInput />
      </section>

      {/* 2. 체크박스 컴포넌트 */}
      <section style={sectionStyle}>
        <h2>✅ 체크박스</h2>
        <MyCheckbox />
      </section>

      {/* 3. 폼 컴포넌트 (이름 & 나이) */}
      <section style={sectionStyle}>
        <h2>폼 양식</h2>
        <Form />
      </section>

      {/* 4. 카운터 컴포넌트 */}
      <section style={sectionStyle}>
        <h2>🔢 카운터 (재사용)</h2>
        <Counter />
        <Counter />
      </section>
    </div>
  );
}

// 간단한 스타일링을 위한 객체
const sectionStyle = {
  border: '1px solid #eee',
  padding: '15px',
  margin: '10px 0',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9'
};

export default App;