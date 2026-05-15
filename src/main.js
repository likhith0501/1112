import './style.css';

// Mock Data
const state = {
  patients: [
    { id: 'P001', name: 'Eleanor Vance', age: 34, gender: 'Female', bloodGroup: 'O+', phone: '+1 234 567 8900' },
    { id: 'P002', name: 'James Holden', age: 45, gender: 'Male', bloodGroup: 'A-', phone: '+1 345 678 9012' },
    { id: 'P003', name: 'Naomi Nagata', age: 29, gender: 'Female', bloodGroup: 'B+', phone: '+1 456 789 0123' },
  ],
  doctors: [
    { id: 'D001', name: 'Dr. Amos Burton', specialty: 'Cardiology', email: 'amos@nexuscare.com', phone: '+1 555 123 4567' },
    { id: 'D002', name: 'Dr. Chrisjen Avasarala', specialty: 'Neurology', email: 'chrisjen@nexuscare.com', phone: '+1 555 987 6543' },
  ],
  appointments: [
    { id: 'A001', patientName: 'Eleanor Vance', doctorName: 'Dr. Amos Burton', date: '2026-05-16', time: '10:00', status: 'Upcoming' },
    { id: 'A002', patientName: 'James Holden', doctorName: 'Dr. Chrisjen Avasarala', date: '2026-05-15', time: '14:30', status: 'Completed' },
  ],
  bills: [
    { id: 'B001', patientName: 'Eleanor Vance', date: '2026-05-15', amount: '$150.00', status: 'Paid' },
    { id: 'B002', patientName: 'James Holden', date: '2026-05-12', amount: '$450.00', status: 'Pending' },
  ]
};

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const pageTitle = document.getElementById('page-title');
const contentArea = document.getElementById('content-area');

// Views
const views = {
  dashboard: () => `
    <div class="dashboard-grid">
      <div class="stat-card">
        <div class="stat-icon blue"><i class="ph-fill ph-users"></i></div>
        <div class="stat-info">
          <h3>${state.patients.length}</h3>
          <p>Total Patients</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><i class="ph-fill ph-stethoscope"></i></div>
        <div class="stat-info">
          <h3>${state.doctors.length}</h3>
          <p>Active Doctors</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon purple"><i class="ph-fill ph-calendar-check"></i></div>
        <div class="stat-info">
          <h3>${state.appointments.length}</h3>
          <p>Appointments</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon orange"><i class="ph-fill ph-currency-dollar"></i></div>
        <div class="stat-info">
          <h3>${state.bills.length}</h3>
          <p>Invoices Issued</p>
        </div>
      </div>
    </div>
    
    <div class="glass-panel">
      <div class="section-header">
        <h2 class="section-title">Recent Appointments</h2>
        <button class="primary-btn" onclick="navigateTo('appointments')">View All</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${state.appointments.slice(0,3).map(a => `
              <tr>
                <td>${a.id}</td>
                <td>${a.patientName}</td>
                <td>${a.doctorName}</td>
                <td>${a.date} at ${a.time}</td>
                <td><span class="badge ${a.status === 'Completed' ? 'success' : 'primary'}">${a.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `,
  
  patients: () => `
    <div class="glass-panel">
      <div class="section-header">
        <h2 class="section-title">Patients Directory</h2>
        <button class="primary-btn" onclick="openModal('patient')"><i class="ph ph-plus"></i> Add Patient</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age/Gender</th>
              <th>Blood Group</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${state.patients.map(p => `
              <tr>
                <td>${p.id}</td>
                <td style="font-weight: 500">${p.name}</td>
                <td>${p.age} / ${p.gender}</td>
                <td><span class="badge danger">${p.bloodGroup}</span></td>
                <td>${p.phone}</td>
                <td>
                  <button class="icon-btn" style="width: 32px; height: 32px; font-size: 16px;"><i class="ph ph-pencil-simple"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `,

  doctors: () => `
    <div class="glass-panel">
      <div class="section-header">
        <h2 class="section-title">Medical Staff</h2>
        <button class="primary-btn" onclick="openModal('doctor')"><i class="ph ph-plus"></i> Add Doctor</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor Name</th>
              <th>Specialty</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            ${state.doctors.map(d => `
              <tr>
                <td>${d.id}</td>
                <td style="font-weight: 500">${d.name}</td>
                <td><span class="badge primary">${d.specialty}</span></td>
                <td>${d.email}</td>
                <td>${d.phone}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `,

  appointments: () => `
    <div class="glass-panel">
      <div class="section-header">
        <h2 class="section-title">Appointments</h2>
        <button class="primary-btn" onclick="openModal('appointment')"><i class="ph ph-plus"></i> Schedule New</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${state.appointments.map(a => `
              <tr>
                <td>${a.id}</td>
                <td style="font-weight: 500">${a.patientName}</td>
                <td>${a.doctorName}</td>
                <td>${a.date}</td>
                <td>${a.time}</td>
                <td><span class="badge ${a.status === 'Completed' ? 'success' : 'primary'}">${a.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `,

  bills: () => `
    <div class="glass-panel">
      <div class="section-header">
        <h2 class="section-title">Billing & Invoices</h2>
        <button class="primary-btn" onclick="openModal('bill')"><i class="ph ph-plus"></i> Generate Bill</button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${state.bills.map(b => `
              <tr>
                <td>${b.id}</td>
                <td style="font-weight: 500">${b.patientName}</td>
                <td>${b.date}</td>
                <td style="font-weight: 600">${b.amount}</td>
                <td><span class="badge ${b.status === 'Paid' ? 'success' : 'warning'}">${b.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `
};

// Navigation
window.navigateTo = function(page) {
  navLinks.forEach(link => link.classList.remove('active'));
  const activeLink = document.querySelector(`[data-page="${page}"]`);
  if (activeLink) activeLink.classList.add('active');
  
  pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
  contentArea.innerHTML = views[page]();
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

// Modals Setup
const app = document.getElementById('app');
const modalHTML = `
  <div class="modal-overlay" id="global-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modal-title">Modal Title</h2>
        <button class="close-btn" onclick="closeModal()"><i class="ph ph-x"></i></button>
      </div>
      <div id="modal-body">
        <!-- Form injected here -->
      </div>
    </div>
  </div>
`;
app.insertAdjacentHTML('beforeend', modalHTML);

const modal = document.getElementById('global-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

window.openModal = function(type) {
  let formHTML = '';
  if (type === 'patient') {
    modalTitle.textContent = 'Add New Patient';
    formHTML = `
      <form onsubmit="handleFormSubmit(event, 'patient')">
        <div class="form-group"><label>Full Name</label><input type="text" id="pName" class="form-control" required></div>
        <div style="display:flex; gap:16px;">
          <div class="form-group" style="flex:1"><label>Age</label><input type="number" id="pAge" class="form-control" required></div>
          <div class="form-group" style="flex:1"><label>Gender</label>
            <select id="pGender" class="form-control" required><option value="Male">Male</option><option value="Female">Female</option></select>
          </div>
        </div>
        <div class="form-group"><label>Blood Group</label><input type="text" id="pBlood" class="form-control" required></div>
        <div class="form-group"><label>Phone</label><input type="text" id="pPhone" class="form-control" required></div>
        <button type="submit" class="primary-btn" style="width:100%; justify-content:center; margin-top:16px;">Save Patient</button>
      </form>
    `;
  } else if (type === 'doctor') {
    modalTitle.textContent = 'Add New Doctor';
    formHTML = `
      <form onsubmit="handleFormSubmit(event, 'doctor')">
        <div class="form-group"><label>Doctor Name</label><input type="text" id="dName" class="form-control" required></div>
        <div class="form-group"><label>Specialty</label><input type="text" id="dSpec" class="form-control" required></div>
        <div class="form-group"><label>Email</label><input type="email" id="dEmail" class="form-control" required></div>
        <div class="form-group"><label>Phone</label><input type="text" id="dPhone" class="form-control" required></div>
        <button type="submit" class="primary-btn" style="width:100%; justify-content:center; margin-top:16px;">Save Doctor</button>
      </form>
    `;
  } else if (type === 'appointment') {
    modalTitle.textContent = 'Schedule Appointment';
    formHTML = `
      <form onsubmit="handleFormSubmit(event, 'appointment')">
        <div class="form-group"><label>Patient Name</label>
          <select id="aPatient" class="form-control" required>
            ${state.patients.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label>Doctor</label>
          <select id="aDoctor" class="form-control" required>
            ${state.doctors.map(d => `<option value="${d.name}">${d.name}</option>`).join('')}
          </select>
        </div>
        <div style="display:flex; gap:16px;">
          <div class="form-group" style="flex:1"><label>Date</label><input type="date" id="aDate" class="form-control" required></div>
          <div class="form-group" style="flex:1"><label>Time</label><input type="time" id="aTime" class="form-control" required></div>
        </div>
        <button type="submit" class="primary-btn" style="width:100%; justify-content:center; margin-top:16px;">Schedule</button>
      </form>
    `;
  } else if (type === 'bill') {
    modalTitle.textContent = 'Generate Bill';
    formHTML = `
      <form onsubmit="handleFormSubmit(event, 'bill')">
        <div class="form-group"><label>Patient Name</label>
          <select id="bPatient" class="form-control" required>
            ${state.patients.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group"><label>Amount ($)</label><input type="number" id="bAmount" class="form-control" required></div>
        <button type="submit" class="primary-btn" style="width:100%; justify-content:center; margin-top:16px;">Generate Bill</button>
      </form>
    `;
  }
  
  modalBody.innerHTML = formHTML;
  modal.classList.add('active');
}

window.closeModal = function() {
  modal.classList.remove('active');
}

window.handleFormSubmit = function(e, type) {
  e.preventDefault();
  
  if (type === 'patient') {
    const newPatient = {
      id: 'P00' + (state.patients.length + 1),
      name: document.getElementById('pName').value,
      age: document.getElementById('pAge').value,
      gender: document.getElementById('pGender').value,
      bloodGroup: document.getElementById('pBlood').value,
      phone: document.getElementById('pPhone').value
    };
    state.patients.push(newPatient);
    navigateTo('patients');
  } else if (type === 'doctor') {
    const newDoc = {
      id: 'D00' + (state.doctors.length + 1),
      name: document.getElementById('dName').value,
      specialty: document.getElementById('dSpec').value,
      email: document.getElementById('dEmail').value,
      phone: document.getElementById('dPhone').value
    };
    state.doctors.push(newDoc);
    navigateTo('doctors');
  } else if (type === 'appointment') {
    const newAppt = {
      id: 'A00' + (state.appointments.length + 1),
      patientName: document.getElementById('aPatient').value,
      doctorName: document.getElementById('aDoctor').value,
      date: document.getElementById('aDate').value,
      time: document.getElementById('aTime').value,
      status: 'Upcoming'
    };
    state.appointments.push(newAppt);
    navigateTo('appointments');
  } else if (type === 'bill') {
    const newBill = {
      id: 'B00' + (state.bills.length + 1),
      patientName: document.getElementById('bPatient').value,
      date: new Date().toISOString().split('T')[0],
      amount: '$' + document.getElementById('bAmount').value + '.00',
      status: 'Pending'
    };
    state.bills.push(newBill);
    navigateTo('bills');
  }
  
  closeModal();
}

// Initialize
navigateTo('dashboard');
