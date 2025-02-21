const error = document.getElementById("error");

document
  .getElementById("loginform")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    const formDataObj = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });

    try {
      const response = await fetch(this.action, {
        method: this.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj),
      });

      if (response.status == 200) {
        const data = await response.json();
        document.cookie = `role=${data.role}; path=/; max-age=3600; SameSite=Strict`;
        document.cookie = `username=${data.username}; path=/; max-age=3600; SameSite=Strict`;
        document.cookie = `accessToken=${data.accessToken}; path=/; max-age=3600; SameSite=Strict`;
        await Swal.fire({
          icon: "success",
          title: "Login successfully!",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
        window.location.href = "/dashboard";
      } else {
        const errorData = await response.json();
        error.textContent = errorData.message;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  });

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

console.log(getCookie("accessToken"));
