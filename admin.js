// Admin Sign-Up
function adminSignup(){
  const user = document.getElementById('adminSignupUser').value;
  const pass = document.getElementById('adminSignupPass').value;
  if(!user || !pass){ alert("Fill all fields"); return; }

  const admins = JSON.parse(localStorage.getItem('admins') || '[]');
  if(admins.some(a => a.username===user)){ alert("Username exists"); return; }

  admins.push({username:user, pass});
  localStorage.setItem('admins', JSON.stringify(admins));
  alert("Admin registered successfully!");
}

// Admin Login
function adminLogin(){
  const user = document.getElementById('adminLoginUser').value;
  const pass = document.getElementById('adminLoginPass').value;

  const admins = JSON.parse(localStorage.getItem('admins') || '[]');
  const found = admins.find(a => a.username===user && a.pass===pass);
  if(found){
    alert("Logged in successfully!");
    localStorage.setItem('loggedInAdmin', user);
    window.location.href = "admin-dashboard.html";
  } else alert("Incorrect username/password");
}
