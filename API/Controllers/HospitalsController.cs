using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Hospitals;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API.Controllers
{
    public class HospitalsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Hospital>>> GetHospitals()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hospital>> GetHospital(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateHospital(Hospital hospital)
        {
            return Ok(await Mediator.Send(new Create.Command{ Hospital = hospital }));
        }
    }
}