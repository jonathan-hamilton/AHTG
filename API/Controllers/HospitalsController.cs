using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class HospitalsController : BaseApiController
    {
        private readonly DataContext _context;
        public HospitalsController(DataContext context)
        {
            _context = context;            
        }

        [HttpGet]
        public async Task<ActionResult<List<Hospital>>> GetHospitals()
        {
            return await _context.Hospitals.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hospital>> GetHospital(Guid id)
        {
            return await _context.Hospitals.FindAsync(id);
        }
    }
}