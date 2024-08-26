// import React from 'react';

// const Form = () => {
//     const initialValues = {
//       date: new Date(),
//       time: new Date(),
//       dateTime: new Date(),
//     };

//     const onSubmit = (values) => {
//       console.log('Form submitted with values:', values);
//     };

//     return (
//       <div className="container">
//         <RForm initialValues={initialValues} onSubmit={onSubmit}>
//           {({ handleSubmit }) => (
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label>Date:</label>
//                 <Field name="date" component={DatePicker} />
//               </div>
//               <div>
//                 <label>Time:</label>
//                 <Field name="time" component={DatePicker.Time} />
//               </div>
//               <div>
//                 <label>Date and Time:</label>
//                 <Field name="dateTime" component={DatePicker.DateTime} />
//               </div>
//               <div>
//                 <button type="submit">Submit</button>
//               </div>
//             </form>
//           )}
//         </RForm>
//       </div>
//     );
//   };
// export default Form;
