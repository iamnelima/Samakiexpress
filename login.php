<?php
session_start();
include 'config.php';
$csrf_token = generateCSRFToken();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Samaki Express EA Ltd</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="login-page">
    <!-- Navigation Bar -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <h2><i class="fas fa-fish"></i> Samaki Express EA Ltd</h2>
            </div>
            <div class="nav-menu">
                 <a href="index.php" class="nav-link">Home</a>
                 <a href="index.php#about" class="nav-link">About</a>
                 <a href="index.php#products" class="nav-link">Products</a>
                 <a href="index.php#team" class="nav-link">Our Team</a>
                 <a href="index.php#contact" class="nav-link">Contact</a>
                 <a href="login.php" class="nav-link login-btn active">Login</a>
            </div>
            <div class="hamburger" id="hamburger">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
        </div>
    </nav>

    <!-- Login Section -->
    <section class="login-section">
        <div class="login-container">
            <div class="login-card">
                <h2>Welcome Back</h2>
                <p>Sign in to your Samaki Express account</p>
                <form id="loginForm">
                    <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
                    <div class="form-group">
                        <label for="username">Email</label>
                        <input type="email" id="username" name="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required>
                    </div>
                    <div class="form-options">
                        <div class="remember-me">
                            <input type="checkbox" id="remember">
                            <label for="remember">Remember me</label>
                        </div>
                        <a href="#" class="forgot-password">Forgot Password?</a>
                    </div>
                    <button type="submit" class="login-btn-form">Login</button>
                </form>
                <div class="login-footer">
                    <p>Don't have an account? <a href="#" class="create-account">Create Account</a></p>
                </div>
            </div>
        </div>
    </section>

    <script>
        const API_BASE = 'api/';
        const csrfToken = '<?php echo $csrf_token; ?>';

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.login-btn-form');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Logging In...';
            submitBtn.disabled = true;

            const formData = {
                csrf_token: csrfToken,
                email: document.getElementById('username').value,
                password: document.getElementById('password').value
            };

            fetch('api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                     showSuccessMessage(`Welcome back, ${data.user.name}!<br>Redirecting...`);
                     setTimeout(() => {
                         window.location.href = 'index.php';
                     }, 2000);
                } else {
                    showErrorMessage('Login Failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showErrorMessage('Login failed. Please try again.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });

        function showSuccessMessage(message) {
            // Simple alert for now
            alert(message);
        }

        function showErrorMessage(message) {
            alert(message);
        }
    </script>
    <script src="script.js"></script>
</body>
</html>