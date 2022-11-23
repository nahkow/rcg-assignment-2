import SimpleInput from "./SimpleInput";
import useSimpleInput from "./SimpleInput";

const BasicForm = (props: {}) => {
  const nameInput = useSimpleInput({
    errorMessage: "Please enter a valid name",
    id: "name",
    label: "First Name",
    validation: (value: string) => value.trim() !== "",
  });
  const emailInput = useSimpleInput({
    errorMessage: "Please enter a valid email address",
    id: "email",
    label: "Email",
    validation: (value: string) => value.includes("@"),
  });
  const passwordInput = useSimpleInput({
    errorMessage: "Please enter a valid password",
    id: "password",
    label: "Password",
    validation: (value: string) => value.trim().length > 6,
  });

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!nameInput.isValid) {
      nameInput.focus();
    } else if (!emailInput.isValid) {
      emailInput.focus();
    } else if (!passwordInput.isValid) {
      passwordInput.focus();
    } else {
      console.log("Submitted!");
      console.log(nameInput.value);
      console.log(emailInput.value);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <>{nameInput.FC}</>
      <>{emailInput.FC}</>
      <>{passwordInput.FC}</>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;