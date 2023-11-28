export const textInput = {
  extension: 'input',
  title: 'Input',
  icon: "/svg/Vector.svg",
  settings: {
    type: 'text',
    label: 'Your name',
    placeholder: 'Write name',
  }
};

export const selectInput = {
  extension: 'select',
  title: 'Select',
  icon: "/svg/Vector-1.svg",
  settings: {
    options: ["Male", "Female"],
    multiple: false,
    label: 'Your gender',
  }
};

export const radioGroup = {
  extension: 'input',
  title: 'Radio group',
  icon: "/svg/Vector-2.svg",
  settings: {
    type: 'radio',
    label: 'Experience',
    options: ['Junior', 'Middle', 'Senior'],
  }
};

export const checkBox = {
  extension: 'input',
  title: 'Checkbox',
  icon: "/svg/Vector-3.svg",
  settings: {
    type: 'checkbox',
    label: 'Skills',
    options: ['JS', 'CSS', 'HTML'],
  }
};

export const baseURL = "https://fs-code.onrender.com/forms/"