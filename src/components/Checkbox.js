import "./Checkbox.css"

function Checkbox(props) {
    const {value, onChange} = props;

    return (
        <>
            <input type="checkbox" checked={value} onChange={onChange} className="checkBox" />
        </>
    )
}

export default Checkbox;