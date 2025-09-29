# 🔐 Secure CI Challenge

Welcome to **Secure CI Challenge** — a hands-on demo project showcasing **DevSecOps** practices using **GitHub Actions**, **Semgrep**, and **Trivy** in a Node.js Docker application.  

This project is designed for anyone looking to learn how to integrate **security scanning** into their CI/CD pipelines and catch potential vulnerabilities early in the development cycle.

---

## 🔧 Features

- **Static code analysis** with Semgrep  
  - Detects **hard-coded secrets**, **unsafe eval / Function usage**, and **command injection risks**.
- **Image scanning** with Trivy  
  - Detects OS-level vulnerabilities and outdated packages in the Docker image.
- **GitHub Actions CI/CD workflow**  
  - Runs security checks automatically on push or pull request.
- **Hands-on learning**  
  - Understand how to catch security issues **before deploying code to production**.

---

## ⚠️ Intentional Security Issues

The `app.js` file contains intentional vulnerabilities for educational purposes:

1. **Hard-coded API keys** → Semgrep detects secrets.  
2. **Dynamic evaluation (`Function()`)** → RCE risk detected by Semgrep.  
3. **Unsanitized `child_process.exec()`** → Command injection risk.  
4. **Reading sensitive files without access control** → Demonstrates potential data leaks.

> These issues are intentional and meant for learning how tools like Semgrep and Trivy catch them.


---

## 📌 Connect & Share

If you’re exploring **DevSecOps** like I am, feel free to **fork, experiment, and share your results**!  

> “Secure coding is a journey — every scan is a step forward.”
