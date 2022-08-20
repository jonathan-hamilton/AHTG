using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]        
        public string Email { get; set; }
        [Required]        
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", 
            ErrorMessage = "Password be 4-8 chars long and include Upper & Lower case and a Number")]
        public string Password { get; set; }
        [Required]        
        public string Username { get; set; }
    }
}