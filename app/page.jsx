'use client'
import { useEffect, useState } from 'react'
import LoanTable from './components/LoanTable'
import Chart from 'react-google-charts'
import Login from './components/Login'
export default function Home() {

  const [details, setDetails] = useState({
    loanAmount: 100000,
    tenure: 2,
    rateOfInterest: 5,
  })
  const [emi, setEmi] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  useEffect(() => {
    calculateEmi();
  }, [details])

  useEffect(() => {
    updateChart();
  }, [details, totalAmount]);

  const calculateEmi = () => {
    const { loanAmount, tenure, rateOfInterest } = details
    const r = rateOfInterest / 12 / 100
    const n = tenure * 12
    const emi = loanAmount * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1))

    setEmi(emi)
    console.log("emi", emi);
    setTotalInterest(emi * n - loanAmount)
    setTotalAmount(emi * n)
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    })
  }


  const updateChart = () => {
    const updatedPieData = [
      ['Task', 'Hours per Day'],
      ['Principal', details.loanAmount - 0],
      ['Total Amount', totalAmount - 0]
    ];
    setPieData(updatedPieData);
  };

  const [pieData, setPieData] = useState([
    ['Task', 'Hours per Day'],
    ['Principal', details.loanAmount],
    ['Total Amount', totalAmount],
  ]);

  const pieOptions = {
    title: 'Total Amount to Principal Ratio',
    pieHole: 0.5,
  }

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    async function getUser() {
      const res = await fetch('/api/auth/user');
      const { username, isLoggedIn } = await res.json();
      setUser({ username, isLoggedIn });
    }
    getUser();
  }
    , [showLogin]);


  const handleAddToDB = async () => {
    const res = await fetch('/api/auth/user');
    const { isLoggedIn } = await res.json();
    if (isLoggedIn) {
      const payload = {
        loanAmount: details.loanAmount,
        tenure: details.tenure,
        rateOfInterest: details.rateOfInterest,
        emi: emi,
        totalAmount: totalAmount,
        totalInterest: totalInterest
      }

      fetch('/api/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(async (res) => {
        const data = await res.json();
        alert('Saved to DB\nRecord ID:',data.id);

      }).catch(e => {
          console.log(e);
        })
    }
    else {
      alert('Please Login before saving to DB');
      setShowLogin(true);
    }
  }


  return (
    <main>
      {showLogin && <div className='absolute backdrop-blur-[5px] z-10 w-[100vw] h-[100vh] flex justify-center items-center'>
        <Login setShowLogin={setShowLogin} />
      </div>}


      <div className="text-right">
        <button onClick={handleAddToDB} className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">
          Save to DB
        </button>
      </div>
      <div className='text-center py-6'>
        <h2 className='font-bold text-2xl'>EMI Calculator</h2>
        <p className='font-bold text-xl'>Calculate your monthly EMI</p>
      </div>
      <div className='grid gap-8 md:grid-flow-col grid-flow-row'>

        <div className='p-4 border rounded-md my-10 border-slate-300 '>
          <div className='bg-slate-200 px-3 py-2 rounded-md text-center font-bold'>₹ {emi.toLocaleString('en-US')}/mo</div>
          <div className='my-3 grid grid-flow-row gap-3 md:grid-flow-col'>
            <div className='bg-slate-200 px-3 py-2 rounded-md text-center'>
              Principal - {details.loanAmount.toLocaleString('en-US')}
            </div>
            <div className='bg-slate-200 px-3 py-2 rounded-md text-center'>
              Interest - {totalInterest.toLocaleString('en-US')}
            </div>
          </div>
          <div>
            <input className='float-right p-3 bg-slate-200 rounded-md' type="number" name="loanAmount" value={details.loanAmount} onChange={handleChange} />
            <div>
              <label>Loan Amount</label>
            </div>
            <div>
              <input name="loanAmount" onChange={handleChange} type='range' step={100000} value={details.loanAmount} max={50000000} className='w-[100%]' />
            </div>
          </div>

          <div>
            <select name="tenure" onChange={handleChange} value={details.tenure} className="float-right p-3 bg-slate-200 rounded-md" >
              <option value="1">1 year</option>
              <option value="2">2 year</option>
              <option value="3">3 year</option>
              <option value="4">4 year</option>
              <option value="5">5 years</option>
              <option value="6">6 years</option>
              <option value="7">7 years</option>
              <option value="8">8 years</option>
              <option value="9">9 years</option>
              <option value="10">10 years</option>
              <option value="11">11 years</option>
              <option value="12">12 years</option>
              <option value="13">13 years</option>
              <option value="14">14 years</option>
              <option value="15">15 years</option>
            </select>
            <div>
              <label>Tenure</label>
            </div>
            <div>
              <input onChange={handleChange} name='tenure' type='range' step={1} value={details.tenure} min={1} max={15} className='w-[100%]' />
            </div>
          </div>

          <div>
            <input onChange={handleChange} name="rateOfInterest" type="number" value={details.rateOfInterest} className='float-right p-3 outline-slate-300 outline-[0.1px] bg-slate-200 rounded-md' />
            <div>
              <label>Rate of Interest</label>
            </div>
            <div>
              <input onChange={handleChange} name='rateOfInterest' type='range' min={1} max={20} value={details.rateOfInterest} className='w-[100%]' />
            </div>
          </div>
        </div>
        <div className='text-center p-4 my-10'>
          <h3 className='font-bold '>
            Monthly EMI
          </h3>
          <div>
            <Chart
              height={'320px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={pieData}
              options={pieOptions}
              rootProps={{ 'data-testid': '3' }}
            />
          </div>
        </div>
      </div>

      <LoanTable
        loanAmount={details.loanAmount}
        rateOfInterest={details.rateOfInterest}
        tenure={details.tenure}
      />

    </main >
  )
}
