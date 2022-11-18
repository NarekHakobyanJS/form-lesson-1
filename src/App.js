import './App.css';
// Formik Կոմպոնենտը import ենք անում formik գրադարանից
import { Formik } from 'formik';
import * as yup from 'yup';

//formik ը մեզ օգնում է հեշտացնել աշխատանքը state -ի հետ, error-երի հետ ինչպես նաև 
// տարբեր Ֆորմաներում աշխատելը state -ի հետ,

//yup ը մեզ անրաժեշտ է վալիդացիաները կառավարելու համար 

function App() {
 //Վալիդացիայի համար մենք կոգտագործ ենք yup գրադարանը 
 // Քանի որ formik ի  initialValues - ը իրենից ներկայացնում է Օբյեկտ
 // մենք կոգտվենք yup-ի object մեթոդից և նրան կփոխանցենք Ֆոռման
 // այս փոփոխականը փոխանցենք Formik ին որպես արգումենտ
 const validationSchema = yup.object().shape({
  // string() - տվյալ դաշտի տիպը 
  // required() - պարտադիր
  // string - չի ընդունում նամակներ դրա համար կոգտագործենք մեթոդը typeError()
  name : yup.string().typeError('Դաշտը պետք է լինի տող').required("Պարտադիր"),
  secondName : yup.string().typeError('Դաշտը պետք է լինի տող').required("Պարտադիր"),
  password : yup.string().typeError('Դաշտը պետք է լինի տող').required("Պարտադիր"),
  // yup ում կա մեթոդ oneOf() որը օգտագործում ենք երկու դաշտերի state երը համընկեցնելու համար 
  //oneOf()  ֆունկցիան ստանում է երկու պարամետր 
  //1․ Զանգավծ է - այդ զանգվածում մենք պետք դնենք հղումը այն բանալիի որը ցանկանում ենք որ համընկնի մեր այս բանալիի հետ 
  // yup ունի հատուկ մեթոդ որը կոչվում է ref որինել փոխանցում ենք այդ հղման բանալլին տողի տեսքով 
  //2, Նամակն է տողային տիպով 
  confirmPassword : yup.string().oneOf([yup.ref('password')], 'Գաղտնաբառը չի համընկնում').required("Պարտադիր"),
  // email Ֆունկցիան ստանում է երկու արգումենը Նամակները և Reguliar expresion Ֆունկցիան
  email : yup.string().email('Գրեք ճիշտ Email').required("Պարտադիր"),
  confirmEmail : yup.string().email().oneOf([yup.ref("email")], "Email ը չի համընկում").required("Պարտադիր"),
 })
  return (
    <div className='App'>
      <Formik
      // այստեղ փոխանցումենք բոլոր այն արգումենտները որոնք հարկավորեն մեր Formik կոմպոնենտին
      
      // initialValues = մեր Ֆորմայի նախնական արժեքը որը Օբյեկտ է որին փոխանցում ենք բոլոր անրաժեշտ դաշտերը 
      // initialValues = մենք կարողենք թողնել դատարկ բայց React ը console ում կտպի նամակ որ մեր Ֆորման նախկինում եղել է չԿառավարվող (неУправляемые) Կոմպոնենտ 
      // իսկ այժմ դարձել է Կառավարվող (Управляемые) Կոմպոնենտ
      initialValues={{
        name  : '',
        secondName : '',
        password : '',
        confirmPassword : '',
        email : '',
        confirmEmail : ''

      }}
      // validateOnBlur - Վալիդացիան կատարվում է այն ժամանակ երբ մենք մի ֆորմի մի դաշտից անցնումենք մյուս ֆորմյի մյուս դաշտ 
      validateOnBlur
      //onSubmit - պարտադիր Ֆունկցիա որը կկանչի ֆունկցիան այն ժամանակ երբ կուղարկվի ֆորման 
      //onSubmit - մեզ կտա մեր արժեքը (values)
      onSubmit={(values) => {console.log(values)}}
      validationSchema={validationSchema}
      >
        {/* Այստեղ մենք փոխանցում ենք children երը 
        Formik ում դա ֆունկցիայ է որը ունի օբյեկտ որնել 
        ունի պարտադիր դաշտեր
        */}
        {/* 
          values - արժեքները 
          errors - սխալները
          touched - այն ցույց է տալիս արդյք մենք գործողության մեջ մտելենք տվյալ դաշտի հետ նախկինում
          handleChange - ֆունկցիա որը կանչվում է ամեն անգամ երբ մենք փոխում ենք դաշտի արժեքը 
          handleBlur - ֆունկցիան կանչվում է այն ժամանակ երբ մենք գնումենք ինչոր դաշտից
          isValid - նա մեզ ասում է վավեր է ( validation ) մեր ֆորման տվյալ պահին թե ոչ 
          handleSubmit - այս ֆունկցիան մենք տալիսենք կոճակին որը պետք է ֆորման ուղարկի և նա կկանչի onSubmit ֆունկցիան 
          dirty - նա ասում է փոխվելե ֆորմայի արդյունքը ինչ որ պահին
        */}
        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
          <div className='form'>
{/* ԱՆՈՒՆ */}
            <p>
              <label htmlFor={'name'}>Անուն</label> <br/>
              <input 
              // input ի պարամետրները
              className='input'
              // type - պարտադիր պարամետր չէ
              type={"text"}
              // name - պարտադիր պարամետր է որը պետք է համընկնի initialValues Օբյեկտի դաշտերի հետ 
              name={"name"}
              //onChange - Ֆունկցիային մենք կփոխանցենք handleChange ֆունկցիան
              onChange={handleChange}
              // onBlur - Ֆունկցիային մենք կփոխանցենք handleBlur ֆունկցիան
              onBlur={handleBlur}
              // value - values.name
              value={values.name}
              />
            </p>
            {
              //այստեղ մենք ստուգումենք գործողության մեջ մտելենք այս դաշտի հետ և եթե այս դաշտը պարունակում է սխալ այդ ժամանակ  մենք կվերադարձնենք սխալը p տեգում
              touched.name && errors.name && <p className='error'>{errors.name}</p>
            }
{/* ԱԶԳԱՆՈՒՆ */}
             <p>
              <label htmlFor={'name'}>Ազգանուն</label> <br/>
              <input 
              // input ի պարամետրները
              className='input'
              // type - պարտադիր պարամետր չէ
              type={"text"}
              // name - պարտադիր պարամետր է որը պետք է համընկնի initialValues Օբյեկտի դաշտերի հետ 
              name={"secondName"}
              //onChange - Ֆունկցիային մենք կփոխանցենք handleChange ֆունկցիան
              onChange={handleChange}
              // onBlur - Ֆունկցիային մենք կփոխանցենք handleBlur ֆունկցիան
              onBlur={handleBlur}
              // value - values.name
              value={values.secondName}
              />
            </p>
            {
              //այստեղ մենք ստուգումենք գործողության մեջ մտելենք այս դաշտի հետ և եթե այս դաշտը պարունակում է սխալ այդ ժամանակ  մենք կվերադարձնենք սխալը p տեգում
              touched.secondName && errors.secondName && <p className='error'>{errors.secondName}</p>
            }
{/* Գաղտնաբառ */}
            <p>
              <label htmlFor={'name'}>Գաղտնաբառ</label> <br/>
              <input 
              // input ի պարամետրները
              className='input'
              // type - պարտադիր պարամետր չէ
              type={"password"}
              // name - պարտադիր պարամետր է որը պետք է համընկնի initialValues Օբյեկտի դաշտերի հետ 
              name={"password"}
              //onChange - Ֆունկցիային մենք կփոխանցենք handleChange ֆունկցիան
              onChange={handleChange}
              // onBlur - Ֆունկցիային մենք կփոխանցենք handleBlur ֆունկցիան
              onBlur={handleBlur}
              // value - values.name
              value={values.password}
              />
            </p>
            {
              //այստեղ մենք ստուգումենք գործողության մեջ մտելենք այս դաշտի հետ և եթե այս դաշտը պարունակում է սխալ այդ ժամանակ  մենք կվերադարձնենք սխալը p տեգում
              touched.password && errors.password && <p className='error'>{errors.password}</p>
            }
{/* Գաղտնաբառի հաստատում  */}
            <p>
              <label htmlFor={'password'}>Գաղտնաբառի հաստատում </label> <br/>
              <input 
              // input ի պարամետրները
              className='input'
              // type - պարտադիր պարամետր չէ
              type={"password"}
              // name - պարտադիր պարամետր է որը պետք է համընկնի initialValues Օբյեկտի դաշտերի հետ 
              name={"confirmPassword"}
              //onChange - Ֆունկցիային մենք կփոխանցենք handleChange ֆունկցիան
              onChange={handleChange}
              // onBlur - Ֆունկցիային մենք կփոխանցենք handleBlur ֆունկցիան
              onBlur={handleBlur}
              // value - values.name
              value={values.confirmPassword}
              />
            </p>
            {
              //այստեղ մենք ստուգումենք գործողության մեջ մտելենք այս դաշտի հետ և եթե այս դաշտը պարունակում է սխալ այդ ժամանակ  մենք կվերադարձնենք սխալը p տեգում
              touched.confirmPassword && errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>
            }
{/* Էլ հացե */}
<p>
              <label htmlFor={'email'}>Էլ. հացե</label> <br/>
              <input 
              // input ի պարամետրները
              className='input'
              // type - պարտադիր պարամետր չէ
              type={"text"}
              // name - պարտադիր պարամետր է որը պետք է համընկնի initialValues Օբյեկտի դաշտերի հետ 
              name={"email"}
              //onChange - Ֆունկցիային մենք կփոխանցենք handleChange ֆունկցիան
              onChange={handleChange}
              // onBlur - Ֆունկցիային մենք կփոխանցենք handleBlur ֆունկցիան
              onBlur={handleBlur}
              // value - values.name
              value={values.email}
              />
            </p>
            {
              //այստեղ մենք ստուգումենք գործողության մեջ մտելենք այս դաշտի հետ և եթե այս դաշտը պարունակում է սխալ այդ ժամանակ  մենք կվերադարձնենք սխալը p տեգում
              touched.email && errors.email && <p className='error'>{errors.email}</p>
            }
{/* Էլ հացեի հաստաում */}
            <p>
              <label htmlFor={'email'}>Էլ. հացեի հաստաում</label> <br/>
              <input 
              // input ի պարամետրները
              className='input'
              // type - պարտադիր պարամետր չէ
              type={"email"}
              // name - պարտադիր պարամետր է որը պետք է համընկնի initialValues Օբյեկտի դաշտերի հետ 
              name={"confirmEmail"}
              //onChange - Ֆունկցիային մենք կփոխանցենք handleChange ֆունկցիան
              onChange={handleChange}
              // onBlur - Ֆունկցիային մենք կփոխանցենք handleBlur ֆունկցիան
              onBlur={handleBlur}
              // value - values.name
              value={values.confirmEmail}
              />
            </p>
            {
              //այստեղ մենք ստուգումենք գործողության մեջ մտելենք այս դաշտի հետ և եթե այս դաշտը պարունակում է սխալ այդ ժամանակ  մենք կվերադարձնենք սխալը p տեգում
              touched.confirmEmail && errors.confirmEmail && <p className='error'>{errors.confirmEmail}</p>
            }
            <button
              className='btn'
              //disabled - կնոպկեն դարձնում ենք անհասանելի երբ օրինակ մեր isValid և dirty  պարամետրները հավասար էն false 
              disabled={!isValid &&  !dirty}
              //onClick - ֆունկցիային կփոխանցենք handleSubmit ֆունկցիան 
              onClick={handleSubmit}
              //type = Submit պարտադիր պարամետր 
              type={'submit'}
            >Ուղարկել</button>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default App;
