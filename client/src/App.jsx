import { useState } from 'react';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    prn: '',
    email: '',
    password: '',
    branch: '',
    year: '',
    cgpa: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      window.alert(response.data.message);
      setFormData({
        fullName: '',
        prn: '',
        email: '',
        password: '',
        branch: '',
        year: '',
        cgpa: '',
        category: '',
      });
      setIsLogin(true);
    } catch (error) {
      window.alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        prn: formData.prn,
        password: formData.password,
      });
      window.alert(response.data.message);
      setFormData({
        fullName: '',
        prn: '',
        email: '',
        password: '',
        branch: '',
        year: '',
        cgpa: '',
        category: '',
      });
    } catch (error) {
      window.alert(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '50px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
    },
    select: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
    },
    button: {
      padding: '12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
    },
    buttonDisabled: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
    },
    toggleButton: {
      backgroundColor: '#6c757d',
      marginTop: '15px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>{isLogin ? 'Student Login' : 'Student Registration'}</h1>
      </div>

      <form style={styles.form} onSubmit={isLogin ? handleLogin : handleRegister}>
        {!isLogin && (
          <>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Branch</label>
              <select
                style={styles.select}
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              >
                <option value="">Select Branch</option>
                <option value="CSE">Computer Science</option>
                <option value="ECE">Electronics</option>
                <option value="ME">Mechanical</option>
                <option value="CE">Civil</option>
                <option value="EE">Electrical</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Year</label>
              <select
                style={styles.select}
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              >
                <option value="">Select Year</option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Final Year</option>
              </select>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>CGPA</label>
              <input
                style={styles.input}
                type="number"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                placeholder="Enter CGPA"
                step="0.01"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Category</label>
              <select
                style={styles.select}
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
              </select>
            </div>
          </>
        )}

        <div style={styles.inputGroup}>
          <label style={styles.label}>PRN</label>
          <input
            style={styles.input}
            type="text"
            name="prn"
            value={formData.prn}
            onChange={handleChange}
            placeholder="Enter PRN"
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <button
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <button
        style={{ ...styles.button, ...styles.toggleButton }}
        onClick={() => {
          setIsLogin(!isLogin);
          setFormData({
            fullName: '',
            prn: '',
            email: '',
            password: '',
            branch: '',
            year: '',
            cgpa: '',
            category: '',
          });
        }}
      >
        {isLogin ? 'Go to Registration' : 'Go to Login'}
      </button>
    </div>
  );
}

export default App;
